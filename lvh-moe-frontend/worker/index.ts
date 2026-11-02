import { DurableObject } from 'cloudflare:workers';
import { handleGallery } from './gallery';

// Counters the frontend uses; anything else is rejected so the
// Durable Object storage cannot be filled with arbitrary keys.
const COUNTER_NAMES = new Set(['pets', 'hugs', 'cheeks']);

interface ChangeEvent {
    name: string;
    value: number;
}

/**
 * Single global instance holding every counter and the live WebSocket
 * connections. Replaces the Redis store + in-process EventEmitter of the
 * Node backend.
 */
export class Counters extends DurableObject {
    async getValue(name: string): Promise<number> {
        return (await this.ctx.storage.get<number>(name)) ?? 0;
    }

    async increment(name: string): Promise<number> {
        const value = (await this.getValue(name)) + 1;
        await this.ctx.storage.put(name, value);
        this.broadcast({ name, value });
        return value;
    }

    // WebSocket upgrade requests are forwarded here from the Worker.
    async fetch(): Promise<Response> {
        const [client, server] = Object.values(new WebSocketPair());
        // Hibernatable: the object can be evicted while sockets stay open.
        this.ctx.acceptWebSocket(server);
        return new Response(null, { status: 101, webSocket: client });
    }

    async webSocketClose(ws: WebSocket, code: number, reason: string) {
        try {
            ws.close(code, reason);
        } catch {
            // already closed
        }
    }

    private broadcast(event: ChangeEvent) {
        const payload = JSON.stringify(event);
        for (const ws of this.ctx.getWebSockets()) {
            try {
                ws.send(payload);
            } catch (err) {
                console.warn('websocket send error', err);
            }
        }
    }
}

function json(body: unknown, status = 200): Response {
    return Response.json(body, { status });
}

async function readCounterName(request: Request): Promise<string | null> {
    try {
        const body: unknown = await request.json();
        if (
            typeof body === 'object' &&
            body !== null &&
            'name' in body &&
            typeof body.name === 'string' &&
            COUNTER_NAMES.has(body.name)
        ) {
            return body.name;
        }
    } catch {
        // invalid JSON
    }
    return null;
}

export default {
    async fetch(request, env, ctx): Promise<Response> {
        const url = new URL(request.url);
        // Static assets handle everything else; see assets.runWorkerFirst.
        const path = url.pathname.replace(/^\/api(?=\/|$)/, '');

        if (path.startsWith('/gallery')) {
            const response = await handleGallery(path, request, env);
            if (response) return response;
        }

        const counters = ctx.exports.Counters.getByName('global');

        if (path === '/ws') {
            if (request.headers.get('Upgrade') !== 'websocket') {
                return new Response('Expected Upgrade: websocket', {
                    status: 426,
                });
            }
            return counters.fetch(request);
        }

        if (path === '/health' && request.method === 'GET') {
            return json({});
        }

        if (path === '/inc' && request.method === 'POST') {
            const name = await readCounterName(request);
            if (!name) {
                return json(
                    { success: false, error: 'schema validation failure' },
                    400,
                );
            }
            await counters.increment(name);
            return json({ success: true });
        }

        const valueMatch = path.match(/^\/value\/([^/]+)$/);
        if (valueMatch && request.method === 'GET') {
            const name = decodeURIComponent(valueMatch[1]);
            if (!COUNTER_NAMES.has(name)) {
                return json({ success: false, error: 'unknown counter' }, 404);
            }
            return json({
                success: true,
                value: await counters.getValue(name),
            });
        }

        return json({ success: false, error: 'not found' }, 404);
    },
} satisfies ExportedHandler<Env>;

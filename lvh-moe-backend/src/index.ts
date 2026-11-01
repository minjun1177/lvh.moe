// REDIS_URL, HTTP_PORT

import fastifyCors from '@fastify/cors';
import fastifyWebsocket from '@fastify/websocket';
import EventEmitter from 'events';
import { fastify } from 'fastify';
import { createClient } from 'redis';
import winston from 'winston';
import z from 'zod';
import * as promClient from 'prom-client';

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const registry = new promClient.Registry();

const requestCounter = new promClient.Counter({
    name: 'lvh_requests',
    help: 'LVH requests',
});
requestCounter.inc(0);

registry.registerMetric(requestCounter);

const config = process.env.REDIS_URL
    ? { url: process.env.REDIS_URL }
    : undefined;

const client = await createClient(config)
    .on('error', (err) => logger.error('redis connection error: ', err))
    .connect();

interface ChangeEvent {
    name: string;
    value: number;
}

const app = fastify();
app.register(fastifyWebsocket);
app.register(fastifyCors);

const events = new EventEmitter();

app.register(async (app) => {
    app.get('/ws', { websocket: true }, (conn) => {
        const handler = (x: ChangeEvent) => {
            try {
                conn.send(JSON.stringify(x));
            } catch (err) {
                logger.warn('send error: ', err);
            }
        };

        events.on('change', handler);

        conn.on('close', () => {
            events.off('change', handler);
        });
    });
});

const incSchema = z.object({ name: z.string() });

app.get('/health', () => {
    return {};
});

app.get('/metrics', async () => {
    return await registry.metrics();
});

app.post(
    '/inc',
    {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                },
                required: ['name'],
            },
        },
    },
    (req) => {
        const parseResult = incSchema.safeParse(req.body);

        if (parseResult.success) {
            const name = parseResult.data.name;
            incrementCounter(name).catch((err) =>
                logger.warn('increment counter error: ', err),
            );

            requestCounter.inc();

            return { success: true };
        } else {
            return { success: false, error: 'schema validation failure' };
        }
    },
);

app.get('/value/:name', async (req) => {
    const name = (req.params as any)?.name;

    if (!name) return { success: false, error: 'name field undefined' };

    const value = parseInt((await client.get(`v:${name}`)) ?? '0') || 0;
    return { success: true, value };
});

async function incrementCounter(name: string) {
    const field = `v:${name}`;

    const valueStr = (await client.get(field)) ?? '0';
    const value = parseInt(valueStr) || 0;

    await client.set(field, value + 1);

    events.emit('change', { name, value: value + 1 });
}

app.listen(
    {
        host: '0.0.0.0',
        port: parseInt(process.env.HTTP_PORT ?? '8080'),
    },
    () => {
        logger.info(`listening in ${process.env.PORT ?? '8080'}`);
    },
);

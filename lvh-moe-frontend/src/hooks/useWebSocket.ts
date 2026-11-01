import EventEmitter from 'eventemitter3';
import { useEffect } from 'react';

const wsUrl = import.meta.env.VITE_WS_URL ?? '/api/ws';

export function useWebSocket(): EventEmitter {
    const events = new EventEmitter();

    useEffect(() => {
        const websocket = new WebSocket(wsUrl);

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data?.name) {
                events.emit(data.name, parseInt(data.value));
            }
        };
    }, []);

    return events;
}

import {ClientConnection} from "packet-system-default";
import {WebSocket} from "ws"

export default class ClientConnectionWrapper extends ClientConnection {
    private readonly socket: WebSocket
    private closed = false

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;

        this.socket.onclose = () => {
            this.closed = true
        }
    }

    send(message: string): void {
        this.socket.send(message)
    }

    close(): void {
        this.socket.close(1000, "The server closed the connection.")
    }

    isClosed(): boolean {
        return this.closed;
    }
}
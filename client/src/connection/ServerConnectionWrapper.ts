import {ServerConnection} from "packet-system-default";
import {WebSocket} from "ws"

export default class ServerConnectionWrapper extends ServerConnection {
    private readonly socket: WebSocket
    private closed = false

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;

        this.socket.onclose = () => {
            this.closed = true
        }
    }

    close(): void {
        this.socket.close(1000, "The client forcefully closed the connection.")
    }

    isClosed(): boolean {
        return this.closed;
    }

    send(message: string): void {
        this.socket.send(message)
    }
}
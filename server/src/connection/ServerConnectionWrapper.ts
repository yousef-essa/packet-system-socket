import {ServerConnection} from "packet-system-default";
import {WebSocketServer} from "ws"

export default class ServerConnectionWrapper extends ServerConnection {
    private readonly socket: WebSocketServer
    private closed = false

    constructor(socket: WebSocketServer) {
        super();
        this.socket = socket;

        this.socket.on('close', () => {
            this.closed = true
        })
    }

    close(): void {
        this.socket.close()
    }

    isClosed(): boolean {
        return this.closed;
    }

    send(message: string): void {
        // not possible
    }
}
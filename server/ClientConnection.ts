import {Connection} from "packet-system"
import {WebSocket} from "ws"

export default class ClientConnection extends Connection {
    private readonly socket: WebSocket

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;
    }

    send(message: string): void {
        this.socket.send(message)
    }
}
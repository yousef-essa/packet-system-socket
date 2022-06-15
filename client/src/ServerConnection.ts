import {Connection} from "packet-system"
import { WebSocket } from "ws"

export default class ServerConnection extends Connection {
    private readonly socket: WebSocket

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;
    }

    send(message: string): void {
        this.socket.send(message)
    }
}
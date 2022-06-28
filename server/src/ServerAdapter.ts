import {ServerPacketAdapter, ServerPacketHandler} from "packet-system-default";
import { WebSocket, WebSocketServer } from "ws";
import ClientConnectionWrapper from "./connection/ClientConnectionWrapper";
import {Connection, PacketUtil} from "packet-system";
import ServerConnectionWrapper from "./connection/ServerConnectionWrapper";

export default class ServerAdapter extends ServerPacketAdapter {
    constructor(packetHandler: ServerPacketHandler) {
        super(packetHandler);
    }

    connect(): Connection | null {
        const server = new WebSocketServer({
            port: 9000
        })

        console.log('Listening to port 9000')

        server.on('connection', (connection: WebSocket) => {
            const sender = new ClientConnectionWrapper(connection)
            this.onClientEstablish(sender)

            connection.on('message', (object) => {
                const message = object.toString()
                const packetType = PacketUtil.packetType(message)
                const content = PacketUtil.removePacketType(packetType, message)

                this.onClientMessage(sender, message)

                this.packetHandler.onReceive(packetType, sender, content)
            })

            connection.on('close', () => {
                this.onClientClose(sender)
            })
        })
        return new ServerConnectionWrapper(server)
    }

    public onClientEstablish(connection: Connection) {}
    public onClientMessage(connection: Connection, message: string) {}
    public onClientClose(connection: Connection) {}
}
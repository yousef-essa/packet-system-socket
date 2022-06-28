import {ClientPacketAdapter, ClientPacketHandler} from "packet-system-default";
import {Connection, PacketUtil} from "packet-system";
import ServerConnectionWrapper from "./connection/ServerConnectionWrapper";
import {WebSocket} from "ws"

export default class ClientAdapter extends ClientPacketAdapter {
    constructor(packetHandler: ClientPacketHandler) {
        super(packetHandler);

        this.onServerEstablish = this.onServerEstablish.bind(this)
    }

    connect(): Connection | null {
        const server = new WebSocket(`ws://localhost:9000`)

        if (server == undefined) {
            console.log('Unable to connect to the server. Please ensure the server is up and running well.')
            return null
        }

        const serverConnection = new ServerConnectionWrapper(server)
        server.onopen = () => {
            this.onServerEstablish(serverConnection)

            server.onmessage = (event) => {
                const message = event.data.toString()
                const packetType = PacketUtil.packetType(message)
                const data = PacketUtil.removePacketType(packetType, message)

                this.onServerMessage(serverConnection, message)
                this.packetHandler.onReceive(packetType, serverConnection, data)
            }

            server.onclose = () => {
                this.onServerClose(serverConnection)
            }
        }
        return serverConnection
    }

    public onServerEstablish(connection: Connection) {
        console.log('onServerEstablish method got invoked')
    }
    public onServerMessage(connection: Connection, message: string) {}
    public onServerClose(connection: Connection) {}
}
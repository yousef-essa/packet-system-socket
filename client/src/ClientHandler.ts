import {PacketHandler} from "packet-system";
import ServerConnection from "./ServerConnection";
import { WebSocket } from "ws"

export default class ClientHandler {
    private static REGEX: RegExp = /(?<=\[).+?(?=\])/

    private readonly port: number = 9000
    private readonly packetHandler: PacketHandler

    constructor(port: number) {
        this.port = port
        this.packetHandler = new PacketHandler()

        this.onServerConnection = this.onServerConnection.bind(this)
        this.onServerMessage = this.onServerMessage.bind(this)
        this.onServerDisconnection = this.onServerDisconnection.bind(this)
    }

    connect() {
        const server = new WebSocket(`ws://localhost:${this.port}`)

        if (server === undefined) {
            console.log('Unable to connect to the server. Please ensure the server is up and running well.')
            return
        }

        server.onopen = () => {
            const serverConnection = new ServerConnection(server)

            this.onServerConnection(serverConnection)

            server.onmessage = (event) => {
                const message = event.data.toString()
                const packetType = ClientHandler.type(message)

                this.packetHandler.onReceive(packetType, serverConnection, ClientHandler.cleanUp(packetType, message))
                this.onServerMessage(serverConnection, message)
            }

            server.onclose = () => {
                this.onServerDisconnection(serverConnection)
            }
        }
    }

    onServerConnection(connection: ServerConnection) {
    }

    onServerMessage(connection: ServerConnection, message: String) {
    }

    onServerDisconnection(connection: ServerConnection) {
    }

    getPacketHandler() {
        return this.packetHandler
    }

    static type(message: string) {
        let strings = this.REGEX.exec(message);

        const value: string | undefined = strings?.find((value, index) => index == 0);
        if (value == undefined) {
            return message
        }
        return value
    }

    private static cleanUp(type: String, message: String) {
        return message.replace(`[${type}] `, '')
    }
}
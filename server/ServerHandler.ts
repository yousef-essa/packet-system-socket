import {WebSocket, WebSocketServer} from 'ws'
import {PacketHandler} from "packet-system";
import ClientConnection from "./ClientConnection";

export default class ServerHandler {
    private static REGEX: RegExp = /(?<=\[).+?(?=\])/

    private server: WebSocketServer | undefined
    private readonly port: number = 9000

    private readonly packetHandler: PacketHandler

    constructor(port: number) {
        this.port = port
        this.packetHandler = new PacketHandler()

        this.onClientConnection = this.onClientConnection.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.onClientDisconnection = this.onClientDisconnection.bind(this)
    }

    connect() {
        this.server = new WebSocketServer({
            port: this.port
        })

        this.server.on('connection', (connection: WebSocket) => {
            this.onClientConnection(connection)

            connection.on('message', (object) => {
                const message = object.toString()
                const packetType = ServerHandler.type(message)

                const serverConnection = new ClientConnection(connection)

                this.packetHandler.onReceive(packetType, serverConnection, ServerHandler.cleanUp(packetType, message))
                this.onMessage(connection, message)
            })
            connection.on('close', this.onClientDisconnection)
        })
    }

    onClientConnection(connection: WebSocket) {
    }

    onMessage(connection: WebSocket, message: String) {
    }

    onClientDisconnection(connection: WebSocket) {
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
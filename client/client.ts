import ClientHandler from "./ClientHandler";
import {Connection} from "packet-system";
import {SimpleChatPacket} from "packet-system";

const clientHandler = new ClientHandler(9000)
const packetHandler = clientHandler.getPacketHandler()

clientHandler.onServerConnection = onConnectionEstablished
clientHandler.onServerMessage = onServerMessage
clientHandler.onServerDisconnection = onServerDisconnection

clientHandler.connect()

function onConnectionEstablished(connection: Connection) {
    // sends a simple chat packet to server connection
    packetHandler.send(new SimpleChatPacket("Ping"), connection)
}

function onServerMessage(_: Connection, message: string) {
    // prints the messages we receive from server to console
    console.log(`received message from server: ${message}`)
}

function onServerDisconnection() {
    console.log(`Demolished a connection from the server!`)
}
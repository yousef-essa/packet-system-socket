import ClientHandler from "./ClientHandler";
import {Connection} from "packet-system";
import {SimpleChatPacket} from "packet-system";
import ClientAdapter from "./ClientAdapter";

const clientHandler = new ClientHandler()
const adapter = clientHandler.packetAdapter() as ClientAdapter

adapter.onServerEstablish = onServerEstablish
adapter.onServerMessage = onServerMessage
adapter.onServerClose = onServerClose

function onServerEstablish(connection: Connection) {
    console.log('Established a connection with the server!')

    // sends a simple chat packet to server connection
    clientHandler.send(new SimpleChatPacket("Ping"), connection)
}

function onServerMessage(_: Connection, message: string) {
    // prints the messages we receive from server to console
    console.log(`received message from server: ${message}`)
}

function onServerClose() {
    console.log(`The connection from the server got closed!`)
}

clientHandler.connect()
import ServerHandler from "./ServerHandler";
import {Connection} from "packet-system";

const serverHandler = new ServerHandler(9000)

serverHandler.onClientConnection = onClientEstablished
serverHandler.onClientMessage = onClientMessage
serverHandler.onClientDisconnection = onClientDisconnection

serverHandler.connect()

function onClientEstablished() {
    console.log('Established a connection with a client!')
}

function onClientMessage(_: Connection, message: string) {
    // prints the messages we receive from client to console
    console.log(`received message from client: ${message}`)
}

function onClientDisconnection() {
    console.log(`Demolished a connection from a client!`)
}

console.log('Listening to port 9000')
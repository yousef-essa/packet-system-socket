import ServerHandler from "./ServerHandler";
import {Connection} from "packet-system";
import ServerAdapter from "./ServerAdapter";

const serverHandler = new ServerHandler()
const adapter = serverHandler.packetAdapter() as ServerAdapter

adapter.onClientEstablish = onClientEstablish
adapter.onClientMessage = onClientMessage
adapter.onClientClose = onClientClose

function onClientEstablish() {
    console.log('Established a connection with a client!')
}

function onClientMessage(_: Connection, message: string) {
    // prints the messages we receive from client to console
    console.log(`received message from client: ${message}`)
}

function onClientClose() {
    console.log(`Demolished a connection from a client!`)
}

serverHandler.connect()
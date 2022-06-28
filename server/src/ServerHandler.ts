import {ServerPacketAdapter, ServerPacketHandler} from "packet-system-default"
import ServerAdapter from "./ServerAdapter";

export default class ServerHandler extends ServerPacketHandler {
    constructor() {
        super();
    }

    packetAdapter(): ServerPacketAdapter {
        return new ServerAdapter(this);
    }
}
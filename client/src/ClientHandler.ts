import {ClientPacketAdapter, ClientPacketHandler} from "packet-system-default";
import ClientAdapter from "./ClientAdapter";

export default class ClientHandler extends ClientPacketHandler {
    constructor() {
        super();
    }

    packetAdapter(): ClientPacketAdapter {
        return new ClientAdapter(this);
    }
}
# packet-system-socket
A simple one-way communication system from client <-> server that relies on the [packet-system](https://github.com/yousef-essa/packet-system).

To get the sample working, do the following:
1. clone this repository.
2. head over to server directory.  
  2.1. run `npm install` to download the required dependencies.  
  2.2. run `esrun server.ts` to initiate the server process.
3. head over to client directory.  
  3.1. run `npm install` to download the required dependencies.  
  3.2. run `esrun client.ts` to initiate the client process.
4. look at both terminals for the result.

## Todo
- [ ] Introduce a way for the server <-> client to communicate via the respective terminal.

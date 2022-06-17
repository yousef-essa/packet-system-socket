# packet-system-socket
A simple two-way communication system from client <-> server that relies on the [packet-system](https://github.com/yousef-essa/packet-system).

To get the sample working, do the following:
1. clone this repository.
2. head over to server directory.  
  2.1. run `npm run install` to download the required dependencies.  
  2.2. run `npm run start` to initiate the server process.
3. head over to client directory.  
  3.1. run `npm run install` to download the required dependencies.  
  3.2. run `npm run start` to initiate the server process.
4. look at both terminals to see the ping/pong debug messages.

## Todo
- [ ] Introduce a way for the server <-> client to communicate via the respective terminal.

/**
*  define a controller to retrieve static resources
*/
export default class SocketController {

  #io;
  #players;

  constructor(io) {
    this.#io = io;
    this.#players = new Map();
    this.connexionAll();
  }

  connexionAll() {
    this.#io.on('connection', socket => this.handleConnexion(socket));
  }
  
  handleConnexion(socket) {
    const sId = socket.id;
    const nb = this.#players.size + 1;
    console.log(`Connected player #${nb} at ${sId}`);
    socket.emit('number', nb);
    console.log(`Sent ${nb} at ${sId}`);
    if (nb < 3) {
      this.#players.set(nb, sId);
      socket.on('movement', (...mess) => {
        this.handleMovement(socket, ...mess);
      });
      //socket.on('other moved', (sockid, messages) => "CA BOUGE OUECH");
      socket.on('disconnect', () => {
        this.handleDisconnexion(sId);
      });

    }
    else {
      console.log(`Disconnecting ${sId} : too many players already connected`);
      socket.disconnect(true);
    }
  }

  handleDisconnexion(socketid) {
    console.log(`Disconnecting ${socketid} : one player disconnected. End of game.`);
    this.#io.send(`One player disconnected. End of game. Disconnecting remaining player.`);
    this.#io.disconnectSockets();
    this.#players.clear();
  }

  handleMovement(socket, ...message) {
    this.#io.emit('other moved', socket.id, ...message);
  }

}

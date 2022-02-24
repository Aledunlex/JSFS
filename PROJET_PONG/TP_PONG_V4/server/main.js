import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io'

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);

let players = new Map();

io.on('connection', socket => {
	const sId = socket.id;
	const nb = players.size + 1;
	console.log(`Connected player #${nb} at ${socket.id}`);
	socket.emit('number', nb);
	console.log(`Sent ${nb} at ${socket.id}`);
	if (nb < 3) {
		players.set(nb, socket.id);
		socket.on( 'disconnect', () => {
			if (players.size > 0) {
				io.send(`One player disconnected. End of game. Disconnecting remaining player.`);
				//if (io.fetchSockets.length > 0) console.log(io.fetchSockets.length, "DISCONNECTED EVERY PLAYER DUE TO ONE PLAYER LEAVING");
				io.disconnectSockets();
				players.clear();
			}
		});
	}
	else {
		console.log(`Disconnecting ${socket.id} : too many players already connected`);
		socket.disconnect(true);
	}
});


server.listen(8000);

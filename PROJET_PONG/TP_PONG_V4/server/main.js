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
	console.log(`Connected player #${nb} at ${sId}`);
	socket.emit('number', nb);
	console.log(`Sent ${nb} at ${sId}`);
	if (nb < 3) {
		players.set(nb, sId);
		socket.on('disconnect', () => {
			console.log(`Disconnecting ${sId} : one player disconnected. End of game.`);
			io.send(`One player disconnected. End of game. Disconnecting remaining player.`);
			io.disconnectSockets();
			players.clear();
		});
	}
	else {
		console.log(`Disconnecting ${sId} : too many players already connected`);
		socket.disconnect(true);
	}
});


server.listen(8000);

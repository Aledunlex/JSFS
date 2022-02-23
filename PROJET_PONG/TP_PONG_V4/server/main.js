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
	if (nb < 3) {
		players.set(nb, socket.id);
		socket.on( 'disconnect', () => {
			players.delete(nb);
			console.log(`Disconnected player #${nb} at ${socket.id}`);
		});
	}
	else {
		console.log(`Disconnecting ${socket.id} : too many players already connected`);
		socket.disconnect(true);
	}
	socket.emit('number', nb);
	console.log(`Sent ${nb} at ${socket.id}`);
});


server.listen(8000);

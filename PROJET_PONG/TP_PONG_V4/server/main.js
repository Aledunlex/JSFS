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
	if (nb < 3) {
		players.set(nb, socket.id);
		socket.on( 'disconnect', () => {
			players.delete(nb);
		});
	}
	socket.emit('number', nb);
	console.log(`Sent ${nb} at ${socket.id}`);
});


server.listen(2800);

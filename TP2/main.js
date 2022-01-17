import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const sockets = Array();

const io = new ServerIO(server);
io.on('connection', socket => sockets.push(socket) );

setInterval(sendToAll, 2000);

server.listen(8080);


/** Will send a random number, different for each socket */
function sendToAll() {
	sockets.forEach(socket => {
		const num = getNewNum()
		socket.emit('number', num);
		console.log(`Sent ${num} at ${socket.id}`);
	});
}


/** Will send a random number, the same for each socket */
// function sendToAll() {
// 	io.emit('number', getNewNum());
// }

function getNewNum() {
	const min = Math.ceil(2);
	const max = Math.floor(9);
	return Math.floor(Math.random() * (max - min)) + min;
}
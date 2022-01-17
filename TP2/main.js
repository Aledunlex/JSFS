import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';

const DELAY = 2000;

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const sockets = new Map();

const io = new ServerIO(server);

io.on('connection', socket => {
	const sId = socket.id;
	sockets.set( sId, setInterval(sendTo, DELAY, socket) );
	socket.on( 'disconnect', () => {
		clearInterval(sockets.get(sId));
		sockets.delete(sId);
	});
});


server.listen(8080);


/** Will send a random number, different for each socket */
function sendTo(socket) {
	const num = getNewNum();
	socket.emit('number', num);
	console.log(`Sent ${num} at ${socket.id}`);
}

/** Will send a random number, the same for each socket */
/** For this to work, sendTo(socket) used to be sendToAll(), and
 * setInterval used to be called only once, on the whole set of sockets.
 */
// function sendToAll() {
// 	io.emit('number', getNewNum());
// }

function getNewNum() {
	const min = Math.ceil(2);
	const max = Math.floor(9);
	return Math.floor(Math.random() * (max - min)) + min;
}
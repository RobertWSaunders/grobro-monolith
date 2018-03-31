
module.exports = (io, loggoer) => {
	io.on('connection', (socket) => {
		logger.info('A socket has been connected!');

		socket.on('message', function(event) {
			logger.info('We have received message from a client!', event);
		});
	});
};

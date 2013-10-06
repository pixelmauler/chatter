var Chat = function(socket){
	this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text){
	var message = {
		room: room,
		text: text
	};
	this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room){
	this.socket.emit('join', {
		newRoom: room
	});
};
Chat.prototype.processCommand = function(com){
	var words = com.split(' '),
		command = words[0].substring(1, words[0].length).toLowerCase(),
		message = false,
		room,
		name;
		
	switch(command){
		case 'join':
			words.shift();
			room = words.join(' ');
			this.changeRoom(room);
		break;
		case 'nick':
			words.shift();
			name = words.join(' ');
			this.socket.emit('nameAttempt', name);
		break;
		default:
			message = 'Unrecognized command.';
		break;
	}
	return message;
};
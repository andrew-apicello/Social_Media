var socket = io.connect();

console.log('chat script connected')

// let's assume that the client page, once rendered, knows what room it wants to join
var room = "abc123";

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});
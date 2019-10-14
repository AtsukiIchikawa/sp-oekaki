var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var socketIO = require('socket.io');
var io = require('socket.io')(http);
 

app.get('/', function (req, res){
	res.sendfile(__dirname + '/index.html');
});
 
io.sockets.on('connection', function(socket){

	// クライアントからメッセージ受信
	socket.on('clear canvas', function(){
		// 自分以外の全員に送る
		socket.broadcast.emit('clear all canvas');
	});

	// クライアントからメッセージ受信
	socket.on('context info', function(msg){
		// 自分以外の全員に送る
		socket.broadcast.emit('share context info', msg);
	});
 
	// 切断
	socket.on('disconnect', function () {
		io.sockets.emit('user disconnected');
	});

});


http.listen(process.env.PORT || 5000, function(){
	console.log('Server running.');
});

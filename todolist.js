var express = require('express');
var todoList = express();
var http = require('http');
var server = http.createServer(todoList);
var io = require('socket.io')(server);
var listTodo = [];

todoList.use(
    express.static('public'),
)

// connection à socket.io
io.on('connection', function (socket) {
    
    // Recupération d'un message envoyé
    socket.on('message', function(data) {
        if ( data.pseudo.trim() !== '' && data.message.trim() !== '' ) {
            var newMessage = { letter : data.pseudo.charAt(0).toUpperCase(), 
                                              pseudo : data.pseudo, 
                                              message : data.message }
            listTodo.unshift(newMessage);
            socket.broadcast.emit('newMessage', newMessage);
        }
    })

    socket.on('delete', function(data) {
        if( data.index >= 0 && typeof(data.index) != 'undefined' ) {
            listTodo.splice(data.index, 1);
            socket.broadcast.emit('deleteItem', data.index)
        }
    })
})

todoList.get('/home', function(req, res) {
    res.render('index.ejs', {title: 'Todo List', todolist: listTodo});
})

todoList.use(function(req, res, next) {
    res.redirect('/home');
})

server.listen(8080);
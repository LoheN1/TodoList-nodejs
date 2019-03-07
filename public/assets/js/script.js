var socket = io();

var pseudo  = document.querySelector('#pseudoValue');
var message = document.querySelector('#message');

// Au clique sur submit le message est envoyé avec socket
document.querySelector('#addMessage').addEventListener('submit', function() {
    socket.emit('message', { 'pseudo': pseudo.value, 'message': message.value } )
})

// Les autres pages inserent le nouveau message dans la liste
socket.on('newMessage', function(data) {
    var messageElement = addMessage(data);
    document.querySelector('#todolist').prepend(messageElement);
});

// Supprimer l'item 
socket.on('deleteItem', function(data) {
    message =document.querySelector('#todolist').children[data]
    message.parentNode.removeChild(message);
});

document.querySelectorAll('.deleteTodo').forEach(function(el, index) {
    el.addEventListener('click', function() {
        socket.emit('delete', { 'index': index } )
    })
})

// Création d'un message et ajout des données
function addMessage(data) {
    var li = document.createElement('li');
    li.setAttribute('class', 'collection-item avatar');
    var initialEl = document.createElement('span');
    initialEl.setAttribute('class', 'circle red lighten-2');
    initialEl.setAttribute('title', data.pseudo);
    initialEl.innerHTML = data.letter;
    var messageEl = document.createElement('span');
    messageEl.setAttribute('class', 'title');
    messageEl.innerHTML = data.message;
    var deleteEl = document.createElement('a');
    deleteEl.setAttribute('class', 'deleteTodo secondary-content');
    deleteEl.setAttribute('href', '/')
    var icon = document.createElement('i');
    icon.setAttribute('class', 'material-icons')
    icon.innerHTML = 'delete';
    deleteEl.append(icon);
    li.append(initialEl);
    li.append(messageEl);
    li.append(deleteEl)
    return li;
}

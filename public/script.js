// public/script.js
const socket = io();
let username = null;

function signUp() {
    username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter your name.');
        return;
    }
    socket.emit('set name', username);
    document.querySelector('.signup-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    const item = document.createElement('li');
    item.textContent = `${data.name}: ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user connected', (name) => {
    const item = document.createElement('li');
    item.textContent = `${name} connected`;
    item.style.color = 'blue';
    messages.appendChild(item);
});

socket.on('user disconnected', (name) => {
    const item = document.createElement('li');
    item.textContent = `${name} disconnected`;
    item.style.color = 'red';
    messages.appendChild(item);
});

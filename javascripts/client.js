const socket = io('https://webchat-webchatmix-rkbansal8848.onrender.com');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');
const nameshow = document.getElementsByClassName('user');
var audio = new Audio('../sounds/notification.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
}
const userName = prompt('Enter Your Name To Join');
const coden=prompt("Enter The Code And Share It With Your Friend To Join")
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', { message, code: coden });
  messageInput.value = '';
});


socket.on('connect', () => {
  nameshow[0].innerText = "User: " + userName;
  
  socket.emit('new-user-joined', { name: userName, code: coden });
});

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
  append(`${name} left the chat`, 'right');
});

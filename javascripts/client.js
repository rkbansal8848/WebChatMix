const socket = io('https://webchat-webchatmix-rkbansal8848.onrender.com');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');
const nameshow=document.getElementsByClassName('user');
var audio=new Audio('../sounds/notification.mp3');

  const append = (message, position)=>{

    const messageElement = document.createElement('div');
    messageElement.innerText=message; 
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
      audio.play();
    }

  }

  form.addEventListener('submit',(e)=>{
    e.preventDefault();//will not reload the form
    const message = messageInput.value;
    //`template literal`
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value='';
  })


  const userName= prompt('Enter Your name to Join');
  //event listener
  socket.on('connect', () => {
    nameshow[0].innerText = "User: " + userName;
   socket.emit('new-user-joined', userName);
 });

 //event listener when user join
 socket.on('user-joined',name=>{
  append(`${name} joined the chat`,'right')
 })

 //event listener when user send message
 socket.on('receive',data=>{
  append(`${data.name}: ${data.message}`,'left')
 })

 //event listener when user left the chat
 socket.on('left',name=>{
  append(`${name} left the chat`,'right')
 })



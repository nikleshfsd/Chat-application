const chatMsgForm = document.getElementById('chat-msg-form');

// Get username and room from URL
const { userid, roomid } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Initialize socket.io
const socket = io();

socket.on('message', (message) => {
  console.log(message);
  formatDomMessage(message);
});

// Send text message
chatMsgForm.addEventListener('submit', (event) => {
  // Prevent from to submit
  event.preventDefault();

  const msgText = event.target.elements.message.value;

  // Emit chat msg to server
  socket.emit('chatMsgText', msgText, { userid, roomid });

  // Empty message field
  event.target.elements.message.value = '';
  event.target.elements.message.focus();
});

// Emit for join room
socket.emit('joinRoom', { userid, roomid });

// Emit for left room
// document.getElementById("leaveChat").addEventListener("click", ()=>{
document.addEventListener('DOMContentLoaded', () => {
  socket.emit('leaveRoom', { userid, roomid });
  document.getElementById('leaveChat').onclick = () => {
    alert();
  };
  // });
});

// Redirect user on entry form
socket.on('redirect', function (destination) {
  console.log(`hi`);
  window.location.href = destination;
});

// Format DOM message for render HTML
function formatDomMessage(message) {
  const div = document.createElement('div');

  div.classList.add('receivedMessage');

  div.innerHTML = `<p>${message.userName} <br> ${message.textMsg}<br><span>${message.time}</span></p>`;

  console.log(div);
  document.querySelector('#chat-window').appendChild(div);
}

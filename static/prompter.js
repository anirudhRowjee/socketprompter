// chat.js file setup

// make connection to socket

var socket = io.connect('http://' + document.domain + ':' + location.port + '/socket');

socket.on('connect', socket_1 => {
  console.log("Prompter - Connected to server");
  socket.emit('prompter_connected');
})

var messagebox = document.getElementById('main_message');

function change_bg_color(color){
  document.body.style.backgroundColor = color;
}

function change_prompter_message(message){
  messagebox.innerText = message;
}

socket.on('prompt_alert', function(prompt) {
  console.log("Prompt Received");
  console.log(prompt);
  change_prompter_message(prompt.promptmsg);
  change_bg_color(prompt.promptcolor);
})


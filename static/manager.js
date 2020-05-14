// chat.js file setup

// make connection to socket

var socket = io.connect('http://' + document.domain + ':' + location.port + '/socket');

socket.on('connect', socket_r => {
  console.log("Manager - Connected to server");
  socket.emit('manager_connected');
})

var form = document.getElementById("manager_form")
var promptmsg = document.getElementById("promptmsg")
var promptcolor = document.getElementById("promptcolor")
var submitbutton = document.getElementById('sendprompt');

submitbutton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(promptmsg.value, promptcolor.value)
  // add event listener to push form data to socket
  socket.emit('prompt', {
    promptmsg: promptmsg.value,
    promptcolor: promptcolor.value,
  })
})

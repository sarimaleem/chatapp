
const queryString = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const username = queryString.name
const room = queryString.room

socket.emit('joinRoom', {username, room})

$(function () {
  
  var socket = io()

  $("#chatBox").submit(function (e) {
    e.preventDefault(); // prevents page reloading
    data = { name: username, message: $("#m").val() };
    socket.emit("chat message", data);
    $("#m").val("");
    message = addMessage(data, "green");
    $("#messages").append(message);

    return false;
  });

  socket.on("chat message", function (msg) {
    message = addMessage(msg, "blue");
    $("#messages").append(message);
  });
});

function addMessage(data, color) {
  var listFormat = $("<li>");
  var nameFormat = $("<strong>").text(data.name + "   ");
  nameFormat.addClass("message");
  nameFormat.css("color", color);
  var messageFormat = $("<span>").text(data.message);
  messageFormat.addClass("message");
  listFormat.append(nameFormat);
  listFormat.append(messageFormat);
  return listFormat;
}

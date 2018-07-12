var socket = io();
var name = "";
function init() {
    $('#nameForm').submit(function () {
        name = $('#name').val();
        if (!name) {
            alert('Please provide a name to enter chat');
        }

        $('#messages').append($('<li class="user-enter">').text(name + ' entered the chat!!'));
        return false;
    });

    $('#chatForm').submit(function(){
        if (!name) {
            alert('Please provide a name before you chat');
            return false;
        }
        if (!$('#m').val()) {
            return false;
        }
        socket.emit('chat_message', $('#m').val());
        $('#messages').append($('<li class="self-message">').text('You: ' + $('#m').val()));
        $('#m').val('');
        // $("#msg-container").scrollTop($("#msg-container")[0].scrollHeight);
        return false;
      });
    
    socket.on('chat_message', function (msg) {
        $('#messages').append($('<li class="incoming-message">').text('SomeOne: ' + msg));
        $("#msg-container").scrollTop($("#msg-container")[0].scrollHeight);
    });
}

init();
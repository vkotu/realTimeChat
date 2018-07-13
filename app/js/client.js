var socket;
var userName = "";

function init() {
    handleNewUser();
    handleChatSubmit();
}

function initSocketIoListener () {
    socket.on('chat_message', function (data) {
        $('#messages').append($('<li class="incoming-message">').text(data.userName + ': ' + data.msg));
        $("#msg-container").scrollTop($("#msg-container")[0].scrollHeight);
    });

    socket.on('new_user', function (name) {
        $('#messages').append($('<li class="user-enter">').text(name + ' entered the chat!!'));
    });

    socket.on('user_disconnected', function (name) {
        $('#messages').append($('<li class="user-enter">').text(name + ' disconnected from chat!!'));
    });
}

function handleNewUser () {
    $('#nameForm').submit(function () {
        if($.trim(userName)) {
            alert('You already entered name!');
            return false;
        }
        if (!$.trim($('#name').val())) {
            alert('Please provide a name to enter chat');
            return false;
        }
        $('.userName').css({
            'visibility': 'hidden',
        });
        $('.chat').css({
            'visibility': 'visible',
            'opacity': 1,
            'pointer-events': 'all'
        });
        socket = io();
        initSocketIoListener();
        userName = $.trim($('#name').val());
        $('#messages').append($('<li class="user-enter">').text('Welcome ' + userName + "!!"));
        socket.emit('new_user', userName);
        return false;
    });
}

function handleChatSubmit () {
    $('#chatForm').submit(function(){
        if (!$.trim(userName)) {
            alert('Please provide a name before you chat');
            return false;
        }
        var msg = $.trim($('#m').val());
        if (!msg) {
            return false;
        }
        socket.emit('chat_message', {
            msg: msg,
            userName: userName
        });
        $('#messages').append($('<li class="self-message">').text('You: ' + $('#m').val()));
        $('#m').val('');
        $("#msg-container").scrollTop($("#msg-container")[0].scrollHeight);
        return false;
      });
}

init();
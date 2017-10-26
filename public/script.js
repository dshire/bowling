const socket = io.connect();

socket.on('welcome',() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="welcome">Welcome to Babbelonian Bowling</div>');
});

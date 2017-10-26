const socket = io.connect();

socket.on('welcome',() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="welcome">Welcome to Babbelonian Bowling</div>');
});


$('.button').on('click',() => {
    socket.emit('roll');
});

socket.on('roll', (data) => {
    console.log(data.playerFrames);

});

const socket = io.connect();

socket.on('welcome',() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="welcome">Welcome to Babbelonian Bowling</div>');
});


$('.button').on('click',() => {
    socket.emit('roll');
});

socket.on('roll', (data) => {
    console.log(data.playerFrames);

    for (let i = 0; i < data.playerFrames.length; i++) {
        var frame="frame" + i;
        if (data.playerFrames[i].roll2 >= 0) {
            if (data.playerFrames[i].roll1 == 10) {
                data.playerFrames[i].roll1 = 'X';
                data.playerFrames[i].roll2 = ''
            } else if (data.playerFrames[i].roll2 == 10) {
                data.playerFrames[i].roll2 = 'X'
            } else if (data.playerFrames[i].roll1 + data.playerFrames[i].roll2 == 10) {
                data.playerFrames[i].roll2 = '/'
            }
            $('.' + frame).html(`<p class="roll1">${data.playerFrames[i].roll1}</p><p class="roll2">${data.playerFrames[i].roll2}</p><p class="score">${data.playerFrames[i].score}</p>`)
        } else {
            $('.' + frame).html(`<span class="points"><p class="roll1">${data.playerFrames[i].roll1}</p></span>`)
        }
    }
});

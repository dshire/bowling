const socket = io.connect();


$('.button').on('click',() => {
    $('.pins').remove();
    socket.emit('roll');
    $('.button').after('<img src="./pins.png" alt="pins" class="pins">')
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
                data.playerFrames[i].roll2 = '/'
            } else if (data.playerFrames[i].roll1 + data.playerFrames[i].roll2 == 10) {
                data.playerFrames[i].roll2 = '/'
            }
            $('.' + frame).html(`<p class="roll1">${data.playerFrames[i].roll1}</p><p class="roll2">${data.playerFrames[i].roll2}</p><p class="score">${data.playerFrames[i].score}</p><div class="corner"></div>`)
        } else {
            $('.' + frame).html(`<span class="points"><p class="roll1">${data.playerFrames[i].roll1}</p></span><div class="corner"></div>`)
        }
    }
});

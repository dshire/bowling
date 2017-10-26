const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(express.static('./public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket) {
    let playerFrames = [];
    let frame = 0;
    socket.emit('welcome');

    socket.on('roll', () => {

        if (!playerFrames[frame]) {
            playerFrames.push({})
        }

        if ( !playerFrames[frame].roll1 && playerFrames[frame].roll1 !== 0) {
            let result = Math.floor(Math.random() * 11);
            playerFrames[frame].roll1 = result;

            if (result == 10) {
                playerFrames[frame].roll2 = 0;
                frame++;
            }
        } else {
            let result = Math.floor(Math.random() * (11 - playerFrames[frame].roll1));
            playerFrames[frame].roll2 = result;

            frame++;
        }

        calcScore()

        console.log(playerFrames);

        socket.emit('roll', {playerFrames});
    });

    function calcScore() {
        let score = 0;
        for (let i = 0; i < playerFrames.length; i++) {
            if (playerFrames[i].roll1 >= 0 && playerFrames[i].roll2 >= 0) {

                if (playerFrames[i].roll1 == 10 || playerFrames[i].roll2 == 10){
                    if (playerFrames[i+1] && playerFrames[i+1].roll1) {
                        if (playerFrames[i+1].roll1 == 10) {
                            if (playerFrames[i+2] && playerFrames[i+2].roll1) {
                                score += playerFrames[i+2].roll1;
                            }
                        } else {
                            score += playerFrames[i+1].roll1;
                            if (playerFrames[i+1] && playerFrames[i+1].roll2) {
                                score += playerFrames[i+1].roll2;
                            }
                        }
                    }
                } else if (playerFrames[i].roll1 + playerFrames[i].roll2 == 10) {
                    if (playerFrames[i+1] && playerFrames[i+1].roll1) {
                        score += playerFrames[i+1].roll1;
                    }
                }

                score += (playerFrames[i].roll1 + playerFrames[i].roll2)
                playerFrames[i].score = score

            }
        }
    }
});

server.listen(8080, function() {
    console.log('Listening on port:8080');
});

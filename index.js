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
        console.log(playerFrames);

        socket.emit('roll', {playerFrames});        
    });
});

server.listen(8080, function() {
    console.log('Listening on port:8080');
});

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(express.static('./public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});




server.listen(8080, function() {
    console.log('Listening on port:8080');
});

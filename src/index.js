const express = require("express")
const path = require("path");
const http = require("http")
const socketio = require("socket.io")
const app=express();
const Filter = require('bad-words')
const server = http.createServer(app);
const io = socketio(server);


const publicDirectoryPath=path.join(__dirname,'../public');


const port = process.env.PORT ||3000;

app.use(express.static(publicDirectoryPath));

let count=0;


io.on('connection',(socket)=>{
    console.log("NEW CONNECTION ESHTABLISH");

    socket.emit('message','welcome new one');

    socket.broadcast.emit('message','A new user has join!');
    
    socket.on('sendMessage',(msg,callback)=>{

        const filter = new Filter();
        if(filter.isProfane(msg))
        {
            return callback('Profanity is not allowed!')
        }
        io.emit('message',msg);
        callback("sandeep response");
    })

    socket.on('sendLocation',(coords,callback)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback()
    })
    // socket.emit('countUpdated',count);
    // socket.on('increment',()=>{
    //     count++;
    //     // socket.emit('countUpdated',count);
    //     io.emit('countUpdated',count);
    // })
    socket.on('disconnect',()=>{
        io.emit('message','A user has left!');
    })
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
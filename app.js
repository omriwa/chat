var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    chat = require("./router/chat.js");

// //setup engine
app.set('view-engine','ejs');

// //setup dir
app.use(express.static(__dirname + '/asset'));

//routes
app.use(chat);

//userlist
var userList = [];


io.on('connection', function(socket){
    console.log("connected");
    console.log(userList);
    
    socket.on('disconnect-user',function(nick){
        let list1 , list2 , deleteIndex = userList.indexOf(nick);
        list1 = userList.slice(0,deleteIndex);
        list2 = userList.slice(deleteIndex + 1 , userList.length);
        userList = list1.concat(list2);
        io.emit('add-user',userList);
    });
    
    socket.on('user-msg' , function(msg) {
        io.emit('server-msg',msg);
    });
    
    socket.on('add-user' , function(userNick) {
        userList.push(userNick);
        io.emit('add-user',userList);
    });
});

server.listen(process.env.PORT);
console.log('server is up');
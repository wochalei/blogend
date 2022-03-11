const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const indexRouter = require('./route/index');
const blogRouter = require('./route/blog');
const loginRouter = require('./route/login');
const typeRouter = require('./route/blog_type');
const commentRouter = require('./route/comment');
const imgRouter = require('./route/img');
const friendRouter = require('./route/friend');
const userRouter = require('./route/user');
const bodyParser = require('body-parser');
const systemRouter = require('./route/system');
const {checkToken} = require('./control/index');

const app = express();
const path = require('path');
const httpServer = createServer(app);
app.use(express.static(path.join(__dirname,'dist')));
/* app.use(express.static('static')); */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',indexRouter);
app.use('/api/user',loginRouter);
app.use('/api/blog',blogRouter);
app.use('/api/blogtype',typeRouter);
app.use('/api/comment',commentRouter);
app.use('/api/img',imgRouter);
app.use('/api/friend',friendRouter);
app.use('/api/useriformation',userRouter);
app.use('/api/system',systemRouter);



/* app.listen(8000,()=>{
  console.log("1");
}) */
const io = new Server(httpServer, { cors: {
  origin: " http://localhost:3301",
  credentials: true
} });
let count = io.engine.clientsCount;

io.on("connection", (socket) => {
  setInterval(()=>{
      count = io.engine.clientsCount

      socket.emit('new',count);
  },5000)
  
});
httpServer.listen(8000);

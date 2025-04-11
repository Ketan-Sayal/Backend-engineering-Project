const path = require('path');
const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./api/apiIndexRoutes');
const postRoutes = require('./api/apiHandlePost');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require("express-session");
const errorHandlerMiddleware = require('./middlewares/Errorhandler');
const loggerMiddleware = require('./middlewares/Logger');
const app = express();

// Middlewares
app.use(express.urlencoded({"extended": true}));
app.use(express.json());

// Third-party middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

// Ejs setup
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Routes middlewares
app.use('/', indexRouter);
app.use('/api', postRoutes)

//Global middlewares
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);

app.listen(80, ()=>{
    console.log("Server is running on port 80")
    console.log("\nhttp://localhost:80")
}).on("error", (err)=>{
    if(err.code === "EADDRINUSE"){
        app.listen(3000, ()=>{
            console.log("Port 80 is busy and server is tring to run it on port 3000");
            console.log("Server is running at port 3000");
            console.log("\nhttp://localhost:80");
        });
    }
    console.log(err.message);
    
})
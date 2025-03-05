const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./api/apiIndexRoutes');
const postRoutes = require('./api/apiHandlePost');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('flash');
const helmet = require('helmet');
const session = require("express-session");
const errorHandlerMiddleware = require('./middlewares/Errorhandler');
const loggerMiddleware = require('./middlewares/Logger');
const app = express();

// Middlewares
app.use(express.urlencoded({"extended": true}));
app.use(express.json());

// Third-party middlewares
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(session{
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
});
app.use(flash());

// Routes middlewares
app.use('/', indexRouter);
app.use('/api', postRoutes)

//Global middlewares
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);

app.listen(3000, ()=>{
    console.log("Server is running on port 80")
    console.log("http://localhost:3000")
})
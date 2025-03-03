const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./api/apiIndexRoutes');
const postRoutes = require('./api/apiHandlePost');
const errorHandlerMiddleware = require('./middlewares/Errorhandler');
const loggerMiddleware = require('./middlewares/Logger');
const app = express();

// Middlewares
app.use(express.urlencoded({"extended": true}));
app.use(express.json());

// Routes middlewares
app.use('/', indexRouter);
app.use('/api', postRoutes)

//Global middlewares
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);
app.use(morgan('dev'));

app.listen(80, ()=>{
    console.log("Server is running on port 80")
    console.log("http://localhost:80")
})
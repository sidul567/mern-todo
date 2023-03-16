// external import
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// internal imports
const todoRouter = require('./router/todoRouter');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

// create app
const app = express();
// env config
dotenv.config();

// Port
const port = process.env.PORT || 8000;

// Database connection
mongoose.connect(process.env.MONGO_STRING)
.then(()=>console.log("Database connection successfully!"))
.catch((err)=>console.log(err))
 
// Request object
app.use(express.json());
app.use(cors());

// routing
app.use('/',todoRouter);

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

app.listen(port,()=>{ 
    console.log(`app listen on port ${port}!`);  
})
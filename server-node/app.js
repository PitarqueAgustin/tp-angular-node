const express = require('express');
const { mongoose } = require('./database');
const cors = require('cors');
const app = express();

//Start server in port 4300
app.listen(4300, ()=>{
    console.log('listen on port 4300')
});

//Middlewares
app.use(cors());
app.use(express.json());

//Routes manager
app.use('/api/' ,require('./controller/product.controller')); // api/ seria el prefijo


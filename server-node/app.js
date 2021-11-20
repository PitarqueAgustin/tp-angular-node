require('dotenv').config(); //Permite manejar variables de entornos
const express = require('express');
require('./database')
const cors = require('cors');
const app = express();

//Start server in port 4300
app.listen(4300, ()=>{
    console.log('listen on port 4300')
});

//Middlewares
app.use(cors());
app.use(express.json());

//Routes manager - /api/ seria el prefijo
app.use('/api/' ,require('./controller/product.controller'));
app.use('/api/' ,require('./controller/ticket.controller'));


const express = require('express');
// const { isValidObjectId } = require('mongoose');
const router = express.Router();

//Traigo la capa de servicio
const ServiceTicket = require('../services/ticket.services');

//Traigo los modelos
const Tickets = require('../models/ticket');

router.post('/buy', (req, res)=>{

    const { products, total } = req.body;

    if(ServiceTicket.Validate(products, total)){
        const ticket = new Tickets({
            products,
            total
        });

        try{
            ticket.save();
            res.json({Result: 'Success ticket'});
        }catch(err){
            res.json({Result: err});
        }
    }else{
        res.json({Result: 'Los datos ingresados son inválidos. Revise!'});
    }
});

module.exports = router;
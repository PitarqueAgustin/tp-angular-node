const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();


//Traigo los modelos
const Tickets = require('../models/ticket');

router.post('/buy', async (req, res)=>{

    const { products, total } = req.body;

    const ticket = new Tickets({
        products,
        total
    });

    try{
        await ticket.save();
        res.json({Result: 'Success ticket'});
    }catch(err){
        res.json({Result: err});
    }
});

module.exports = router;
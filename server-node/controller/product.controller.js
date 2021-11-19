const express = require('express');
const router = express.Router();

//Traigo la capa de servicio
const ServiceProduct = require('../services/product.services');

//Traigo los modelos
const Products = require('../models/product');

router.get('/products', async (req, res) =>{

    const products = await Products.find();

    res.json(products);
});


module.exports = router;
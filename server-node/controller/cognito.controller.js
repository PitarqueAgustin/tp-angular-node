const express = require("express");
const router = express.Router();

//Traigo la capa de servicio
const ServiceCognito = require("../services/cognito.services");

//Traigo los modelos
//const Products = require('../models/product');

router.get("/signup", async (req, res) => {
  //const products = await Products.find();

  //res.json(products);
  ServiceCognito.RegisterUser();
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  ServiceCognito.Login(email, password);
});

module.exports = router;

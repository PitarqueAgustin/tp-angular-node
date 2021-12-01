const express = require("express");
const router = express.Router();

//Traigo la capa de servicio
const ServiceCognito = require("../services/cognito.services");

//Traigo los modelos
//const Products = require('../models/product');

router.post("/signup", async (req, res) => {
  const { userData } = req.body;
  console.log(userData);
  try {
    let response = ServiceCognito.RegisterUser(userData);
    res.json({"res":response});
  } catch (error) {
    res.status(401).json({
      error: "No se ha podido registrar el usuario",
    });
  }

  //const products = await Products.find();

  //res.json(products);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let token = "";
  try {
    token = await ServiceCognito.Login(email, password);
    res.json(token);
  } catch (error) {
    res.status(401).json({
      error: "Usuario o contraseña incorrectos",
    });
  }
});

module.exports = router;

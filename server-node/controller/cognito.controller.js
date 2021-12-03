const express = require("express");
const router = express.Router();

//Traigo la capa de servicio
const ServiceCognito = require("../services/cognito.services");

router.post("/signup", async (req, res) => {
  const { userData } = req.body;
  console.log(userData);
  try {
    let response = await ServiceCognito.RegisterUser(userData);
    res.json({ res: response });
  } catch (error) {
    res.status(401).json({
      error: "No se ha podido registrar el usuario",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let token = "";
  try {
    token = await ServiceCognito.Login(email, password);
    res.json(token);
  } catch (error) {
    res.status(401).json({
      error: error.code === "UserNotConfirmedException" ? "Por favor confirme su usuario a traves de su email" :"Usuario o contraseña incorrectos",
    });
  }
});

module.exports = router;

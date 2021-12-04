const express = require("express");
const router = express.Router();

//Traigo la capa de servicio
const ServiceCognito = require("../services/cognito.services");

//Traigo los modelos
const Users = require('../models/user');

router.post("/signup", (req, res) => {
  const { userData } = req.body;
  console.log(userData);


  Users.findOne({'email': userData.email}, async (err,docs)=>{ 
    if(docs != null){
      res.status(401).json({
          error: 'Email ya registrado'
      });
    }else{
      try {
        let response = await ServiceCognito.RegisterUser(userData);
        const user = new Users({
          email: userData.email
        });
        user.save();
        res.json({ res: response });
      } catch (error) {
        res.status(401).json({
          // error: "No se ha podido registrar el usuario",
          error: ServiceCognito.ManagerError(error.code)
        });
      }
    }

  });


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

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");
const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
global.fetch = require("node-fetch");
const express = require("express");

const poolData = {
  UserPoolId: "us-east-2_ksXTVRnns", // Your user pool id here
  ClientId: "eq76lqatr9t6qpnuijasr1rik", // Your client id here
};
const pool_region = "us-east-2";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const app = express();

app.use(express.json());

// app.post("/signup", (req, res) => {
//   console.log("JSON:" + JSON.stringify(req.body));

//   var attributeList = [];
//   attributeList.push(
//     new AmazonCognitoIdentity.CognitoUserAttribute({
//       Name: "email",
//       Value: req.body.email,
//     })
//   );

//   /*attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
//     */

//   userPool.signUp(
//     req.body.username,
//     req.body.password,
//     attributeList,
//     null,
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         res.json(err);
//         return;
//       }
//       cognitoUser = result.user;
//       console.log("user name is " + cognitoUser.getUsername());
//       res.json({
//         bienvenido: `${cognitoUser.getUsername()}`,
//       });
//     }
//   );
// });

function Login(email, password) {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password,
  });

  var userData = {
    Username: email,
    Pool: userPool,
  };
  
  
  console.log("------------------------------------------------------------------")
  console.log(authenticationDetails)
  console.log("------------------------------------------------------------------")


  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log("access token + " + result.getAccessToken().getJwtToken());
      console.log("id token + " + result.getIdToken().getJwtToken());
      console.log("refresh token + " + result.getRefreshToken().getToken());
    },
    onFailure: function (err) {
      console.log(err);
    },
  });
}

function RegisterUser() {
  var attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: "Prasad Jayashanka",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "preferred_username",
      Value: "jay",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "gender",
      Value: "male",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "birthdate",
      Value: "1991-06-21",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "address",
      Value: "CMB",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: "asd@gmail.com",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: "+5412614324321",
    })
  );
  //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

  userPool.signUp(
    "Demian",
    "User123456!",
    attributeList,
    null,
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
    }
  );
}

module.exports.Login = Login;
module.exports.RegisterUser = RegisterUser;
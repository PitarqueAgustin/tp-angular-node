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

function Login(email, password) {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password,
  });

  var userData = {
    Username: email,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          accesToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
        });
      },
      onFailure: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
}

function RegisterUser(userData) {
  var attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: userData.name,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "preferred_username",
      Value: userData.username,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "gender",
      Value: userData.gender,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "birthdate",
      Value: userData.birthdate,
      // Value: "1991-06-21",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "address",
      Value: userData.address,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: userData.email,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: userData.phone_number,
    })
  );
  //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

  var userInfo = {
    Username: userData.email,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userInfo);

  return new Promise((resolve, reject) => {

    userPool.signUp(
      userData.username,
      userData.password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        cognitoUser = result.user;
        console.log("user name is " + cognitoUser.getUsername());
        resolve({
          "response":userData.name+", para completar tu registro, por favor verifica tu email"
        });
      }
    );
  });

}

module.exports.Login = Login;
module.exports.RegisterUser = RegisterUser;

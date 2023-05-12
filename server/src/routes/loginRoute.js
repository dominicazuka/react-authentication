import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = require("../models/user");
import {AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';
import {awsUserPool} from '../util/awsUserPool'

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    new CognitoUser({Username:email, Pool: awsUserPool}).authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
      onSuccess: async (result) =>{
        const user = await User.findOne({ email });    
    
        const { _id: id, isVerified, info } = user;
        
          jwt.sign(
            {
              id,
              isVerified,
              email,
              info,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" },
            (err, token) => {
              if (err) {
                return res.sendStatus(500);
              }
              res.status(200).json({ token });
            }
          );
      },
      onFailure: (err) =>{
        res.sendStatus(401);
      }
    })
  },
};

import jwt from "jsonwebtoken";
const User = require("../models/user");
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import  {awsUserPool} from "../util/awsUserPool"
import {v4 as uuid} from "uuid";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];
 
    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        console.log("awsResult >>>", awsResult);
        if (err) {
          console.log("error", err); 
          return res.status(400).json({
            message: "Unable to sign up. Please try again",
          });
        }
        const startingInfo = { 
          favouriteCity: "", 
          profession: "",
          bio: "",
        };
        const result = await User.create({ 
          email: email,
          info: startingInfo,
          verificationString: uuid(),
          password: password
        });
        const { insertedId } = result;
        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
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
      }
    );
  },
};

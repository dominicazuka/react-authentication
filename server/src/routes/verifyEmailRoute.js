const User = require("../models/user");
import jwt from "jsonwebtoken";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put", 
  handler: async (req, res) => {
    const { email, verificationString } = req.body;
    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err) 
          return res
            .status(401)
            .json({ error: "The email Verification code is incorrect" });
        const result = await User.findOneAndUpdate(
          { email },
          {
            $set: { isVerified: true },
          },
          {
            new: true,
          }
        ); 
        const { _id: id, info } = result;
        jwt.sign(
          { id, email, isVerified: true, info },
          process.env.JWT_SECRET,
          { expiresIn: "3d" },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200).json({ token });
          }
        );
      }
    );
  },
};

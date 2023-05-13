import bcrypt from "bcrypt";
const User = require("../models/user");
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";
import jwt from "jsonwebtoken";

export const resetPasswordRoute = {
  path: "/api/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { email, verificationString, newPassword } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user);
    console.log("values", { email, verificationString, newPassword });
    const newPasswordHash = bcrypt.hash(newPassword, 10);
    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
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
        onFailure: (err) => {
          res.sendStatus(401);
        },
      }
    );
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    }).confirmPassword(verificationString, newPassword, {
      onSuccess: () => {
        // Update MongoDB password
        const user = User.findOneAndUpdate(
          { email },
          { $set: { password: newPasswordHash } },
          { new: true }
        );
        const { _id: id, info } = user;
        // Update AWS Cognito password
        cognitoUser.changePassword(
          newPassword,
          verificationString,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }
            jwt.sign(
              { id, email, isVerified: true, info },
              process.env.JWT_SECRET,
              { expiresIn: "3d" },
              (err, token) => {
                if (err) return res.sendStatus(500);
                res.status(200).json({ token });
              }
            );
          }
        );
      },
      onFailure: (err) => {
        console.log("Failed to confirm password", err);
        res.status(401).json({ error: "Verification code is invalid" });
      },
    });
  },
};

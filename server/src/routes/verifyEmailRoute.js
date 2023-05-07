const User = require("../models/user");
import jwt from "jsonwebtoken";

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
    const { verificationString } = req.body;
    // console.log(req.body)
    const result = await User.findOne({
      verificationString,
    });
    // console.log("verifyEmailRoute", result)
    if (!result) 
      return res
        .status(401)
        .json({ message: "The email verification code is wrong" });

    const { _id: id, email, info } = result;

    await User.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { isVerified: true } }
    );

    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200).json({ token });
      }
    );
  },
};

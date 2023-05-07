import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid"
import eventManager from "../event"; 

const User = require("../models/user");

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const findUsers = await User.find({ email });

    if (findUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "A user with that credentials already exist!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid()

    const startingInfo = {
      favouriteCity: "",
      profession: "",
      bio: "",
    };

    const result = await User.create({
      email,
      password:passwordHash,
      info: startingInfo,
      isVerified: false,
      verificationString
    }); 

    try {
      const message = `
      Thanks for signing up! To proceed, kindly verify your email address, click here:
      http://localhost:3000/verify-email/${verificationString}
      `
      await eventManager.emit('verify-email', {email, message})
    } catch (error) {
      res.sendStatus(500)
    }

    jwt.sign(
      {
        id: result._id.toString(),
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};

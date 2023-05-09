import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = require("../models/user");

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password: userPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unathorised!" });
    }

    const { _id: id, isVerified, password, info } = user;

    const isCorrect = await bcrypt.compare(userPassword, password);

    if (isCorrect) {
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
            return res.status(500).send(err);
          }
          res.status(200).json({ token });
        }
      );
    } else{
        res.sendStatus(401)
    }
  },
};

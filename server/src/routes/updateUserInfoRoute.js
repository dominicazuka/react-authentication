import jwt from "jsonwebtoken";
const User = require("../models/user");

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = ({ favouriteCity, profession, bio }) =>
      ({
        favouriteCity,
        profession,
        bio,
      }(req.body));

    if (!authorization) {
      return res.status(401).json({ message: "No authorization found" });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });
      const { id, isVerified } = decoded;
      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      if (!isVerified)
        return res
          .status(403)
          .json({
            message:
              "You need to verify your email before you can update your data",
          });

      const result = await User.findOneAndUpdate(
        { _id: id },
        { $set: { info: updates } },
        { returnOriginal: false }
      );
      const { email, info } = result.value;
      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};

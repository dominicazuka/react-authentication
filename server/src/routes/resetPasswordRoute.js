import bcrypt from "bcrypt";
const User = require("../models/user");

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    try {
      const { passwordResetCode } = req.params;
      const { newPassword } = req.body;
      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      const result = await User.findOne({
        passwordResetCode,
      });
      if (!result)
        return res
          .status(401)
          .json({ message: "The password verification code is wrong" });

      const { _id: id } = result;

      await User.findOneAndUpdate(
        {
          _id: id,
        },
        { $set: { password: newPasswordHash } }
      );
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.log(error);
    }
  },
};

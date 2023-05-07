import { v4 as uuid } from "uuid";
const eventManager = require("../event");
const User = require("../models/user");

export const forgotPassswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;
    const passwordResetCode = uuid();
    const result = await User.updateOne(
      { email },
      { $set: { passwordResetCode } }
    );

    if (result.modifiedCount > 0) {
      try {
        const message = `
            To reset your password, click this link:
            http://localhost:3000/reset-password/${passwordResetCode}
            `;
        await eventManager.emit("reset-password", { email, message });
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
    res.sendStatus(200);
  },
};

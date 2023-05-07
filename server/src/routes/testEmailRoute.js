const eventManager = require("../event");

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await eventManager.emit("verify-email", req.body);
      res.sendStatus(200);
    } catch (error) {
      console.log("error", error);
      res.sendStatus(500);
    }
  },
};

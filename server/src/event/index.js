const { EventEmitter } = require("events");
const eventManager = new EventEmitter();
const { verifyEmailTemplate } = require("../util/template");
const { verifyMailDispatcher } = require("../util");

eventManager.on("verify-email", async (payload) => {
  try {
    const html = await verifyEmailTemplate(payload.message);
    const options = {
      from: "React Authentication <reactauth@omimek.com>",
      to: payload.email,
      html,
      subject: "Verify your email address",
    };
    await verifyMailDispatcher(options);
  } catch (error) {
    console.log("error", error);
  }
});

eventManager.on("reset-password", async (payload) => {
  try {
    const html = await verifyEmailTemplate(payload.message);
    const options = {
      from: "Forgot Password <reactauth@omimek.com>",
      to: payload.email,
      html,
      subject: "Password Reset Link",
    };
    await verifyMailDispatcher(options);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = eventManager;

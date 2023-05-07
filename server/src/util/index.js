const nodemailer = require("nodemailer");
const { mailConfig } = require("../config");

const { host, port, info } = mailConfig;

const verifyMailDispatcher = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      host,
      port,
      pool: true,
      maxConnections: 20,
      maxMessages: Infinity,
      priority: "high",
      secure: port === 465 ? true : false,
      auth: {
        user: info.user,
        pass: info.password,
      },
    });
    let result = await transporter.sendMail({
      from: info.user,
      subject: options.subject,
      ...options,
    });
    return {
      error: false,
      result,
    };
  } catch (error) {
    console.log("verifyMailDispatcher error", error);
    return {
      error: true,
      result: error.message,
    };
  }
};

module.exports = { verifyMailDispatcher };

const mailConfig = {
  info: {
    user: process.env.MAIL_INFO_USER,
    password: process.env.MAIL_INFO_PWD,
  },
  port:
    process.env.NODE_ENV === "production"
      ? parseInt(process.env.MAIL_PORT, 10)
      : 465,
  host: process.env.MAIL_HOST,
};

module.exports = { mailConfig };
 

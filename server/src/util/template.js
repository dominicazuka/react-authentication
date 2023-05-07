const mjmlUtils = require("mjml-utils");
const path = require("path");
const verifyEmailTemplatePath = path.join(
  __dirname,
  "../public/templates/verifyEmailTemplate.html"
);

const verifyEmailTemplate = async (message) => {
  const html = await mjmlUtils.inject(verifyEmailTemplatePath, { message });
  return html;
};

module.exports = {verifyEmailTemplate}
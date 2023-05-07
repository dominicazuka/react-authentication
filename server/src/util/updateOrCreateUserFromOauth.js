import {v4 as uuid} from "uuid"
const User = require("../models/user");

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const {
    id: googleId,
    verified_Email: isVerified,
    email,
  } = JSON.stringify(oauthUserInfo);

  const existingUser = await User.findOne({ email: oauthUserInfo.email });
  if (existingUser) {
    const result = await User.findOneAndUpdate(
      { email: oauthUserInfo.email },
      { $set: { googleId: oauthUserInfo.id, isVerified: true } },
      { new: true }
    );
    return result;
  } else { 
    const startingInfo = {
      favouriteCity: "",
      profession: "",
      bio: "",
    };
    const result = await User.create({
      email: oauthUserInfo.email,
      password: uuid(),
      info: startingInfo,
      isVerified: true,
      verificationString: uuid(),
      googleId: oauthUserInfo.id,
      passwordResetCode: "",
    });
    await result.save(); 
    return result;
  }
};

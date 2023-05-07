import { forgotPassswordRoute } from "./forgotPasswordRoute";
import { getGoogleOathUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";
import { logInRoute } from "./loginRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { signUpRoute } from "./signUpRoute";
import { testEmailRoute } from "./testEmailRoute";
import { testRoute } from "./testRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";

export const routes = [
  testRoute,
  signUpRoute,
  logInRoute,
  testEmailRoute,
  verifyEmailRoute,
  updateUserInfoRoute,
  forgotPassswordRoute,
  resetPasswordRoute,
  getGoogleOathUrlRoute,
  googleOauthCallbackRoute,
];
  

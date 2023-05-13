import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

export const forgotPassswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;
    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        res.sendStatus(200);
      },
      onFailure: () => {
        res.sendStatus(500);
      },
    });
  },
};

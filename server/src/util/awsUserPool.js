import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS, { CognitoIdentityCredentials } from "aws-sdk";
import("node-fetch")
  .then((fetch) => {
    // use the fetch function here
    global.fetch = fetch;
  })  
  .catch((err) => {
    // handle any errors here
    console.log("Failed to fetch node-fetch", err);
  }); 

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

export const awsUserPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID,
});

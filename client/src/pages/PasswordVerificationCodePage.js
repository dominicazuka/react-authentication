import { useState } from "react";
import axios from "axios";
import { PasswordResetFailure } from "./PasswordResetFailure";
import { PasswordResetSuccess } from "./PasswordResetSuccess";

export const PasswordVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [verificationString, setVerificationString] = useState("");
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const urlParams = new URLSearchParams(window.location.search); 
  const email = urlParams.get("email");

  const onResetClicked = async () => {
    try {
      const response = await axios.put(`/api/reset-password`, {
        email,
        oldPassword: oldPasswordValue,
        newPassword: passwordValue,
        verificationString,
      });
      console.log("Reset Password Response", response);
      setIsSuccess(true);
    } catch (error) {
      console.log("error", error);
      setIsFailure(true);
    }
  };

  if (isFailure) return <PasswordResetFailure />;
  if (isSuccess) return <PasswordResetSuccess />;

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <h1>Please Verify Your Email</h1>
      <p>
        You should have recieved a verification code at the email address you
        provided, please enter it here
      </p>
      <input
        placeholder="e.g 123456"
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
      />
      <p>Please enter your old password</p>
      <input
        type="password"
        value={oldPasswordValue}
        onChange={(e) => setOldPasswordValue(e.target.value)}
        placeholder="Old Password"
      />
      <p>Please enter a new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="Password"
      />

      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password"
      />

      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../lib/auth/useToken";
import { EmailVerificationSuccess } from "../pages/EmailVerificationSuccess";
import { EmailVerificationFail } from "../pages/EmailVerificationFail";

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [setToken] = useToken();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put("/api/verify-email", {
          verificationString
        });
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        console.log("error verification landing page", error)
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);

  if (isLoading) return <p>Loading....</p>;
  // if (!isSuccess) return <EmailVerificationFail />;
  return <EmailVerificationSuccess />;
};

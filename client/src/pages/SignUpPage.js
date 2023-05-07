import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../lib/auth/useToken";

export const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const onSubmit = async () => {
    // alert("sign up not implemented log in");
    const response = await axios.post("/api/signup", {
      email,
      password,
    });
    const { token } = response.data;
    setToken(token);
    history.push("/please-verify");
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {error && <div className="fail">{error}</div>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="johndoe@gmail.com"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />

      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm password"
        type="password"
      />

      <hr />
      <button
        disabled={!email || !password || password !== confirmPassword}
        onClick={onSubmit}
      >
        Sign Up
      </button>
      <button onClick={() => history.push("/login")}>
        Already have an account? Log In
      </button>
    </div>
  );
};

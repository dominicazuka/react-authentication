import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../lib/auth/useToken";
import axios from "axios"; 
import {useQueryParams} from '../util/useQueryParams'; //takes complicated logic out of getting complicated query from the url

export const LogInPage = () => {
  const [, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const [error, setError] = useState('')
  const {token:oauthToken} = useQueryParams()

  const history = useHistory();

  useEffect(() => {
    if(oauthToken){
      setToken(oauthToken)
      history.push("/") 
    }
  }, [oauthToken, setToken, history])

  useEffect(() => {
    const loadOauthUrl = async () =>{
      try{
        const response = await axios.get('/auth/google/url')
        const {url} = response.data
        setGoogleOauthUrl(url);
      } catch (error){
        console.log(error);
      }
    }
    loadOauthUrl()
  }, [])

  const onSubmit = async () => {
    const response = await axios.post("/api/login", {
      email,
      password,
    });
    const { token } = response.data;
    setToken(token);
    history.push("/");
  };

  return (
    <div className="content-container">
      <h1>Login</h1>
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

      <hr/>

      <button disabled={!email || !password} onClick={onSubmit}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account? Sign Up
      </button>
      <button
      disabled={!googleOauthUrl}
      onClick={() => {window.location.href = googleOauthUrl}}
      >Log in with Google</button>
    </div>
  );
};
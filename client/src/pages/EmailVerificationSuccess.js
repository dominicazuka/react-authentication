import { useHistory } from "react-router-dom";

export const EmailVerificationSuccess = () => {
  const history = useHistory();
  const logOut = () => {
    // We'll want to log the user out here
    // and send them to the "login page"
    localStorage.removeItem('token');
    history.push('/login');
} 

  return (
    <div className="content-container">
      <h1>Success!!</h1>
      <p>Thanks for verifying your email, now you can use all features</p>
      <button onClick={() => logOut()}>Login</button>
    </div>
  );
};

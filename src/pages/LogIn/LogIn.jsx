import React, { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const storeUserData = (userData) => {
    sessionStorage.setItem("studentData", JSON.stringify(userData));
    return true;
  };

  const [token, setToken] = useState(" ");
  const storeUserToken = (userData) => {
    sessionStorage.setItem("token", JSON.stringify(userData?.token));
    setToken(userData?.token);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mental-server.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        storeUserData(data);
        setLoading(false);
        navigate("/mental-health-bot");

        // //console.log(data);
      } else {
        const errorResponseData = await response.json();
        // console.log(errorResponseData);
        setLoginMessage(
          "Either email or password is incorrect. Check and try again."
        );
        setLoading(false);
      }
    } catch (error) {
      //console.log(error);
      setLoginMessage("An error occured. Try again later");
      setLoading(false);
    }
  };

  return (
    <div className="LogInbody">
      <section className="Login">
        {loading && <div className="loader"></div>}

        <h1>Thanks for Joining us </h1>
        <p>Type your email and password to log in.</p>
        <div id="Loginform">
          <div>
            <input
              type="email"
              name="email"
              id="emailL"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              id="passwordL"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={submitForm} id="submitbtn">
              Login
            </button>
            <br />
            <p>
              Don't have an account?
              <Link to="/register"> Sign Up</Link>
            </p>
            {/* {
              <p>
                Forgot Password?
                <Link to="/forgot-password"> Click here</Link>
              </p>
            } */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogIn;

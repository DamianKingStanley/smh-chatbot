import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      if (password === confirmPassword) {
        const response = await fetch(
          "https://mental-server.onrender.com/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname,
              username,
              email,
              password,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRegisterMessage("Registered successfully");
          setLoading(false);

          navigate("/login");
        } else {
          const errorResponseData = await response.json();
          setRegisterMessage(
            errorResponseData.message || "Registration failed. Try again later."
          );
          setLoading(false);
        }
      } else {
        setPasswordMatch(false);
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="SignInbody">
      {loading && <div className="loader"></div>}
      <br /> <br />
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        <h1> Welcome to Riri's Mental Support </h1>
        <p> You don't have to go through stress</p>
        <br />
        <div id="registerform">
          <div>
            <input
              type="text"
              name="fullname"
              id="FullName"
              placeholder="Enter your full name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="username"
              id="Username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
              type="email"
              name="email"
              id="emailAddress"
              placeholder="Enter valid email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={togglePasswordVisibility}
            ></i>
            <br />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="password"
              placeholder="Confirm Password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <i
              className={`fas ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
            <div id="passwordmatchAlert">
              {!passwordMatch && (
                <p>Passwords do not match. Please try again.</p>
              )}
            </div>
            <br />
            <button onClick={submitForm} id="submitbtn">
              Register
            </button>
            <br />
            <br />
          </div>
          <br />
          <p id="already">
            Already have an account? <Link to="/logIn">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

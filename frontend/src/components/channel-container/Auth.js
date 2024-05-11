import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState({ state: false, message: "" });
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    avatarURL: "",
    password: "",
    confirmPassword: "",
  });

  const switchMode = () => {
    setError({ ...error, state: false });
    setIsSignUp((setIsSignUp) => !setIsSignUp);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/auth/${isSignUp ? "signup" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (!response.ok) {
      setError({ ...error, state: true, message: await response.text() });
      return;
    }

    const {
      username,
      fullName,
      phoneNumber,
      avatarURL,
      token,
      userId,
      hashedPassword,
    } = await response.json();

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <div className="auth-form-mode">{isSignUp ? "Sign up" : "Sign in"}</div>

        <form onSubmit={handleSubmit} method="post">
          {isSignUp && (
            <div className="auth-form-input-fields">
              <label htmlFor="fullName">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="auth-form-input-fields">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          {isSignUp && (
            <div className="auth-form-input-fields">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
          )}

          {isSignUp && (
            <div className="auth-form-input-fields">
              <label htmlFor="avatarURL">Avatar URL</label>
              <input
                name="avatarURL"
                type="text"
                placeholder="Avatar URL"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="auth-form-input-fields">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          {isSignUp && (
            <div className="auth-form-input-fields">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
          )}

          {error.state && <div className="auth-form-error">{error.message}</div>}

          <div className="auth-form-input-fields">
            <button>{isSignUp ? "Sign up" : "Sign in"}</button>
          </div>
        </form>

        <div className="auth-form-swap-modes">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span onClick={switchMode}>{isSignUp ? "Sign in" : "Sign up"}</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React from 'react';
import '../assets/stylesheets/autherization.css'

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Login</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
        </div>
        <button type="button" className="login-button">Login</button>
        <p className="signup-link">
          Don&apos;t have an account?
          {' '}
          <button type="button" className="login-url" >Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
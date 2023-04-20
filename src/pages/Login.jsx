import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Logo from "../img/logo.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (

    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Amilo</span>
        <div className="logo-cont"><img className="logo-img" src={Logo} alt="Amilo Logo"/></div>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Oh No!</span>}
        </form>
        <p>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import "../mainpage.css";
import { server } from "../util/axios";
import { useNavigate } from "react-router-dom";
export default function Signinup() {
  const navigate = useNavigate();
  const [login, setlogin] = useState(true);
  const [passreset, setpassreset] = useState(false);
  const [regist, setregist] = useState(false);
  const [emailre, setemailre] = useState("");
  const [error, seterror] = useState("");
  const [emailreg, setemailreg] = useState("");
  const [pasreg, setpassreg] = useState("");
  const [usernamereg, setusernamereg] = useState("");
  const [emaillog, setemaillog] = useState("");
  const [passlog, setpasslog] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action if Enter key is pressed
    }
  };
  const pass = () => {
    setlogin(false);
    setpassreset(true);
    setregist(false);
  };
  const regi = () => {
    setlogin(false);
    setpassreset(false);
    setregist(true);
  };
  const resePass = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post("api/user/request-resetpassword", {
        email: emailre,
      });
      console.log(res);
      seterror(null);
      alert("Email reset link sent to your email!");
    } catch (err) {
      seterror(err.response.data.message);
    }
  };
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post("/api/user", {
        email: emailreg,
        username: usernamereg,
        password: pasreg,
      });
      console.log(res);
      seterror(null);
      setlogin(true);
      setpassreset(false);
      setregist(false);
      alert("You sign up succefully");
    } catch (err) {
      console.log(err);
      seterror(err.response.data.message);
    }
  };

  const logIn = async (e) => {
    e.preventDefault();
    let user;
    try {
      const res = await server.post("/api/user/get", {
        email: emaillog,
        password: passlog,
      });
      seterror(null);
      localStorage.setItem("signin", true);
      localStorage.setItem("name", res.data.data.name);
      localStorage.setItem("tok", res.data.Token);

      localStorage.setItem("ad", res.data.data.isadmin);
      alert("You sign in succefully");
      //navigate("/");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      seterror(err.response.data.message);
    }
  };

  return (
    <div className="signinup">
      {login && (
        <div className="form-container">
          <p className="title">Login</p>
          <form className="form" onSubmit={handleKeyDown}>
            <div className="input-group">
              <label for="username">Email</label>
              <input
                type="email"
                name="username"
                id="username"
                value={emaillog}
                onChange={(e) => setemaillog(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={passlog}
                onChange={(e) => setpasslog(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
              <div className="forgot">
                <button onClick={pass}>Forgot Password ?</button>
              </div>
            </div>
            <button className="sign" onClick={logIn}>
              Sign in
            </button>
          </form>
          <br />
          <p className="signup">
            Don't have an account?
            <button onClick={regi}>Sign up</button>
          </p>
          {error ? (
            <h5 style={{ textAlign: "center", color: "black" }}>! {error}</h5>
          ) : null}
        </div>
      )}
      {passreset && (
        <div className="form-container">
          <p className="title">Reset pass</p>
          <form className="form" onSubmit={handleKeyDown}>
            <div className="input-group">
              <label for="username">Email</label>
              <input
                type="email"
                name="username"
                id="username"
                value={emailre}
                onChange={(e) => setemailre(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <br />

            <button className="sign" onClick={resePass}>
              Reset
            </button>
          </form>
          <br />
          {error ? (
            <h5 style={{ textAlign: "center", color: "black" }}>! {error}</h5>
          ) : null}
        </div>
      )}
      {regist && (
        <div className="form-container">
          <p className="title">Regist</p>
          <form className="form" onSubmit={handleKeyDown}>
            <div className="input-group">
              <label for="username">Email</label>
              <input
                type="email"
                name="username"
                id="username"
                value={emailreg}
                onChange={(e) => setemailreg(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="input-group">
              <label for="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={usernamereg}
                onChange={(e) => setusernamereg(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={pasreg}
                onChange={(e) => setpassreg(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <br />
            <button className="sign" onClick={signUp}>
              Sign up
            </button>
          </form>
          <br />
          {error ? (
            <h5 style={{ textAlign: "center", color: "black" }}>! {error}</h5>
          ) : null}
        </div>
      )}
    </div>
  );
}

import "../mainpage.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { LiaCopyrightSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";

import { CgProfile } from "react-icons/cg";
export default function Layout() {
  const auth = localStorage.getItem("signin");
  const name = localStorage.getItem("name");

  const admin = localStorage.getItem("ad");
  const d = new Date();
  const year = d.getFullYear();

  const [size, setsize] = useState(window.innerWidth < 520);
  const [ismobile, setismobile] = useState(false);
  const [sidemenu, setsidemenu] = useState(false);
  const [nav, setnav] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
    setsidemenu(false);
  };
  useEffect(() => {
    if (size) {
      setismobile(true);
    }
    // Add event listener to handle clicks anywhere on the document
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      // Cleanup function to remove event listener when component unmounts
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleOutsideClick = (event) => {
    if (event.target.closest(".head") === null) {
      setnav(false);
    }
  };

  return (
    <div className="layout">
      <div className="headflex">
        <header className="head">
          <Link to="/" id="h1">
            CyberEats
          </Link>
          {ismobile ? (
            <h1>
              <RxHamburgerMenu id="burger" onClick={() => setsidemenu(true)} />
            </h1>
          ) : auth ? (
            <div className="authnav">
              <Link id="link" to="orderstatus">
                Order status
              </Link>
              <button id="btns" onClick={() => setnav((prev) => !prev)}>
                <CgProfile id="pic" /> {name ? name : "user"}
              </button>
              {nav && (
                <div className="namedet">
                  <Link
                    className="li"
                    to={admin === "false" ? "/create-rest" : "/my-rest"}
                    onClick={() => setnav(false)}
                  >
                    My resturant
                  </Link>

                  <br />
                  <Link
                    to="/user-profile"
                    className="li"
                    onClick={() => setnav(false)}
                  >
                    User profile
                  </Link>
                  <br />
                  <button onClick={() => logout()}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin-up" id="btn">
              Log In
            </Link>
          )}
          {sidemenu &&
            (auth ? (
              <section className="mobmenu2" onClick={() => setsidemenu(false)}>
                <main>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5%",
                      textWrap: "nowrap",
                    }}
                  >
                    {" "}
                    <CgProfile id="pic" /> {name ? name : "user"}
                  </h2>
                  <br />
                  <CgClose id="close" onClick={() => setsidemenu(false)} />
                  <Link
                    id="link"
                    to="orderstatus"
                    onClick={() => setsidemenu(false)}
                  >
                    Order status
                  </Link>
                  <br />

                  <Link
                    className="li"
                    to={admin === "false" ? "/create-rest" : "/my-rest"}
                    onClick={() => setsidemenu(false)}
                  >
                    My resturant
                  </Link>

                  <br />
                  <Link
                    to="/user-profile"
                    className="li"
                    onClick={() => setsidemenu(false)}
                  >
                    User profile
                  </Link>
                  <br />
                  <button onClick={() => logout()}>Log out</button>
                </main>
              </section>
            ) : (
              <section className="mobmenu" onClick={() => setsidemenu(false)}>
                <main>
                  <CgClose id="close" onClick={() => setsidemenu(false)} />

                  <Link
                    to="/signin-up"
                    id="btn"
                    onClick={() => setsidemenu(false)}
                  >
                    Log In
                  </Link>
                </main>
              </section>
            ))}
        </header>
      </div>
      <main>
        <Outlet context={[sidemenu, setsidemenu]} />
      </main>
      <footer>
        <h1>
          Copyrights <LiaCopyrightSolid /> {year} Thomas Laspas
        </h1>
      </footer>
    </div>
  );
}

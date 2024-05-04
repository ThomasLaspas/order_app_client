import { useEffect, useState } from "react";
import { server } from "../util/axios";
import Btnloader from "../components/btnloader";
import Loader from "../components/loader";

import "../mainpage.css";

export default function Userprof() {
  const name = localStorage.getItem("name");
  const [email, setemail] = useState("");
  const [uploader, setuploader] = useState(false);
  const [error, seterror] = useState(null);
  const [load, setload] = useState(false);
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [andress, setandress] = useState("");
  const Token = localStorage.getItem("tok");
  const [msg, setmsg] = useState("");
  useEffect(() => {
    const user = async () => {
      setload(true);
      try {
        const res = await server.get(`/api/user/get/${name}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        setemail(res.data.email);
        setandress(res.data.adres);
        setcity(res.data.city);
        setcountry(res.data.village);
      } catch (err) {
        console.log(err);
      } finally {
        setload(false);
      }
    };
    user();
  }, []);

  const update = async (e) => {
    e.preventDefault();
    setuploader(true);
    try {
      const res = await server.put(
        `/api/user/update`,
        {
          email: email,
          city: city,
          village: country,
          addressLine1: andress,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      seterror("");

      setmsg(res.data.message);
    } catch (err) {
      setmsg("");
      seterror(err.response.data.message);
    } finally {
      setuploader(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action if Enter key is pressed
    }
  };
  if (load) {
    return <Loader />;
  }
  return (
    <div className="userprofile">
      <div className="form-container">
        <p className="title">User profile</p>
        <p>Update your profile </p>
        <form className="form" onSubmit={update}>
          <div className="input-group">
            <label for="username">Email</label>
            <input
              type="email"
              name="email"
              id="username"
              value={email}
              readOnly
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="input-group">
            <label for="password">City</label>
            <input
              type="text"
              name="andressline1"
              id="password"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="input-group">
            <label for="password">Village</label>
            <input
              type="text"
              name="andressline1"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              id="password"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="input-group">
            <label for="password">Andress line</label>
            <input
              type="text"
              name="andressline1"
              id="password"
              value={andress}
              onChange={(e) => setandress(e.target.value)}
              required
              onKeyDown={handleKeyDown}
            />
          </div>
          <br />
          {uploader ? (
            <button className="sign2" type="submit">
              Update <Btnloader />
            </button>
          ) : (
            <button className="sign" type="submit">
              Update
            </button>
          )}
        </form>
        <br />

        {error ? (
          <h5
            style={{
              textAlign: "center",
              color: "red",
              backgroundColor: "white",
            }}
          >
            ! {error}
          </h5>
        ) : (
          <h5
            style={{
              textAlign: "center",
              color: "green",
              backgroundColor: "white",
            }}
          >
            {msg}
          </h5>
        )}
      </div>
    </div>
  );
}

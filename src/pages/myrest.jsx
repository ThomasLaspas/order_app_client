import { useState } from "react";
import "../mainpage.css";
import Upade from "../components/updateres";
import Restorders from "../components/restoredrs";
import { server } from "../util/axios";

export default function Myrest() {
  const [btnac, setbtn] = useState(true);
  const Token = localStorage.getItem("tok");
  const username = localStorage.getItem("name");
  const delt = async () => {
    try {
      const res = await server.delete(
        `api/restaurant/delete/${username}`,

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      localStorage.setItem("ad", false);

      alert("your estaurant deleted sucesfully");
      window.location.href = "/";
    } catch (err) {
      alert("some error ocured try again later");
    }
  };

  const display = () => {
    setbtn((prev) => !prev);
  };
  return (
    <div className="myrest">
      <header>
        <div className="btnsholder">
          <button className={btnac ? "active" : "noactive"} onClick={display}>
            Orders
          </button>
          <button className={btnac ? "noactive" : "active"} onClick={display}>
            Update Restaurant
          </button>
        </div>
        <button className="deletebtn" onClick={delt}>
          Delete Restaurant
        </button>
      </header>
      <br />
      <div className="forms">{btnac ? <Restorders /> : <Upade />}</div>
    </div>
  );
}

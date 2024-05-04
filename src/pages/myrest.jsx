import { useState } from "react";
import "../mainpage.css";
import Upade from "../components/updateres";
import Restorders from "../components/restoredrs";

export default function Myrest() {
  const [btnac, setbtn] = useState(true);

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
        <button className="deletebtn">Delete Restaurant</button>
      </header>
      <br />
      <div className="forms">{btnac ? <Restorders /> : <Upade />}</div>
    </div>
  );
}

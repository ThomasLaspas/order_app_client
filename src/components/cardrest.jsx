import "../mainpage.css";

import { Link } from "react-router-dom";
export default function Cardrest({ img, name, time, price, cousines, id }) {
  return (
    <>
      {" "}
      <section className="restcard">
        <div className="boxrest">
          <img src={img} width={450} />
          <div>
            <br />
            <Link to={`/details/${id}`} className="restname">
              {name}
            </Link>
            <section>
              {cousines.map((co, index) => {
                return <p key={index}>*{co}</p>;
              })}
            </section>
          </div>
        </div>
        <div className="times">
          <h2 style={{ color: "white", textWrap: "nowrap" }}>
            Delivery time: {time} mins
          </h2>
          <h2>Delivery cost:{price} $</h2>
        </div>
      </section>
    </>
  );
}

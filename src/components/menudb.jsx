import { useState } from "react";
import "../mainpage.css";
import { server } from "../util/axios";

export default function Menudb({ name, price, restaurantName, id }) {
  const [view, setview] = useState(true);
  const Token = localStorage.getItem("tok");

  const deletedb = async () => {
    setview(false);

    try {
      const res = await server.delete(
        `api/restaurant/deletemenu/${restaurantName}`,

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          data: {
            id: id, // Pass the id in the request body
          },
        }
      );
    } catch (err) {
      alert("some error occure when deleted item from database. try again ");
      setview(true);
    }
  };
  return (
    <>
      {view ? (
        <div className="items">
          <section>
            <label for="name">Name</label>

            <input
              className="updateinput"
              type="text"
              name="name"
              value={name}
              readOnly
              placeholder="Add new menu"
            />
          </section>
          <section>
            <label for="name">Price ($)</label>

            <input
              className="updateinput"
              type="text"
              name="name"
              value={price}
              readOnly
              placeholder="Add new menu"
            />
          </section>
          <button type="button" className="upbtns" onClick={deletedb}>
            Delete
          </button>
        </div>
      ) : null}{" "}
    </>
  );
}

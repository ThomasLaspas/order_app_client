import "../mainpage.css";
import Orders2 from "./orders2";
import { server } from "../util/axios";
import { useEffect, useState } from "react";
import sounds from "../sounds/notify.wav";
import { useOutletContext } from "react-router-dom";
export default function Restorders() {
  const [sidemenu, setsidemenu] = useOutletContext();
  const [previousDataLength, setPreviousDataLength] = useState(0);
  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);
  const Token = localStorage.getItem("tok");
  const username = localStorage.getItem("name");

  const reloadData = async () => {
    setload(true);
    try {
      const res = await server.post(
        "/api/order/my-orders",
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(res);
      setdata(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    reloadData();

    // Fetch data every minute
    const interval = setInterval(() => {
      reloadData();
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  useEffect(() => {
    if (data.length > previousDataLength) {
      // Play a sound
      const sound = new Audio(sounds);
      sound.play();
    }
    // Update previousDataLength with the current data length
    setPreviousDataLength(data.length);
  }, [data]);
  const filteredData = data.filter((item) => item.status !== "delivered");

  return (
    <section className="Restorders">
      <h1>{filteredData.length} Active orders</h1>
      <br />
      {filteredData.length > 0
        ? filteredData.map((dt) =>
            sidemenu ? null : (
              <Orders2
                key={dt._id}
                clientname={dt.deliveryDetails.name}
                clientcity={dt.deliveryDetails.city}
                clientadd={dt.deliveryDetails.addressLine1}
                time={dt.createdAt}
                amount={dt.totalAmount}
                items={dt.cartItems}
                status={dt.status}
                id={dt._id}
                reloadData={reloadData}
              />
            )
          )
        : null}
    </section>
  );
}

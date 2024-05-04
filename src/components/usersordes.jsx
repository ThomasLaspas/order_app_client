import "../mainpage.css";
import { useState, useEffect } from "react";

import { useOutletContext } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
export default function Userorder({
  load,
  value,
  cartItems,
  city,
  addres,
  status,
  time,
  deliverytime,
  img,
}) {
  const [progress, setProgress] = useState(0);
  const [statusmsg, setstatus] = useState("");
  const formattedPrice = (value / 1).toFixed(2);
  const [sidemenu, setsidemenu] = useOutletContext();
  // Calculate the expected end time of the order
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + deliverytime);
  if (endTime.getDate() !== new Date(time).getDate()) {
    endTime.setDate(endTime.getDate() + 1);
  }
  const orderdate = new Date(time);

  // Format the time to display in the correct timezone and 24-hour format
  const formatTime = (date) => {
    return date.toLocaleTimeString("el-GR", {
      timeZone: "Europe/Athens",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  useEffect(() => {
    let progress = 0;
    let msg = "";

    switch (status) {
      case "placed":
        progress = 20;
        msg = "Placed";
        break;
      case "paid":
        progress = 40;
        msg = "Awaiting Restaurant Confirmation";
        break;
      case "inProgress":
        progress = 60;
        msg = "In Progress";
        break;
      case "outForDelivery":
        progress = 80;
        msg = "Out for Delivery";
        break;
      case "delivered":
        progress = 100;
        msg = "Delivered";
        break;
      default:
        progress = 0;
    }

    setProgress(progress);
    setstatus(msg);
  }, [status]);

  const formatTime2 = (date) => {
    const options = {
      timeZone: "Europe/Athens",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("el-GR", options);
  };

  return (
    <div className="uorder">
      <section>
        <h1>Order status: {statusmsg}</h1>
        <h1>Excepted By: {formatTime(endTime)}</h1>
      </section>
      <br />
      <div className="progressbar">
        {sidemenu ? null : (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 25, // Set the height to your desired value
              backgroundColor: "#424242", // Set the background color to black
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white", // Set the color of the progress bar to black
              },
            }}
          />
        )}
      </div>

      <div className="ordersgrid">
        <div className="mainusreord">
          <div>
            <h1>Order created at:</h1>
            <p>{formatTime2(orderdate)}</p>
          </div>
          <br />
          <div>
            <h1>Delivering to:</h1>
            <p>{city}</p>
            <p>
              {city}, {addres}
            </p>
          </div>
          <br />
          <div>
            <h1>Your order</h1>
            {cartItems
              ? cartItems.map((cr) => {
                  return (
                    <p key={cr.menuItemId}>
                      {cr.name} x {cr.quantity}
                    </p>
                  );
                })
              : null}
          </div>
          <br />
          <hr />
          <br />
          <h1>Total</h1>
          <p>€ {value ? formattedPrice : null}</p>
        </div>
        <div className="orderimage">
          <img src={img} className="orderimg" alt="restaurant logo" />
        </div>
      </div>
    </div>
  );
}

import "../mainpage.css";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { server } from "../util/axios";

export default function Orders2({
  clientname,
  clientcity,
  clientadd,
  time,
  amount,
  items,
  status,
  id,
  reloadData,
}) {
  const Token = localStorage.getItem("tok");
  const [statuss, setstatus] = useState(status);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setstatus(event.target.value);
    const newStatus = event.target.value;
    status2(newStatus); // Pass the updated status directly to status2
  };

  const status2 = async (newStatus) => {
    try {
      const res = await server.put(
        "api/order/updatestatus",
        {
          id: id,
          stat: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      reloadData();
    } catch (err) {
      console.log(err);
      alert("something wrong happend whith updating status. try again");
    }
  };

  // Convert UTC time to Greek timezone and format the date
  const formatTime = (time) => {
    const options = {
      timeZone: "Europe/Athens",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(time).toLocaleString("el-GR", options);
  };
  return (
    <div className="orders2">
      <section>
        <h2>
          Customer name:{" "}
          <span style={{ fontWeight: "lighter" }}>{clientname}</span>
        </h2>
        <h2>
          Delivery address:{" "}
          <span style={{ fontWeight: "lighter" }}>
            {clientcity}, {clientadd}
          </span>
        </h2>
        <h2>
          Order created at:{" "}
          <span style={{ fontWeight: "lighter" }}>{formatTime(time)}</span>
        </h2>
        <h2>
          Total cost: <span style={{ fontWeight: "lighter" }}>{amount} €</span>
        </h2>
      </section>
      <hr />
      <br />
      <div className="restorderitems">
        {items
          ? items.map((it) => {
              return (
                <p key={it._id}>
                  {it.quantity} x {it.name}
                </p>
              );
            })
          : null}
      </div>
      <br />
      <div className="orderstatusbar">
        <h3>What is the status of the order</h3>
        <FormControl
          sx={{
            m: 1,
            width: isMobile ? "90%" : "100%",
            backgroundColor: "white",
            height: isMobile ? "20px" : "40px",
            color: "black",
            fontSize: isMobile ? "10px" : "16px",
          }}
        >
          <InputLabel id="status-label">{status}</InputLabel>
          <Select
            value={statuss}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              height: isMobile ? "20px" : "40px",
              color: "black",
              fontSize: isMobile ? "10px" : "16px",
            }}
          >
            <MenuItem
              value="paid"
              sx={{
                height: isMobile ? "20px" : "40px",

                fontSize: isMobile ? "10px" : "16px",
              }}
            >
              Paid
            </MenuItem>
            <MenuItem
              value="inProgress"
              sx={{
                height: isMobile ? "20px" : "40px",

                fontSize: isMobile ? "10px" : "16px",
              }}
            >
              in progress
            </MenuItem>
            <MenuItem
              value="outForDelivery"
              sx={{
                height: isMobile ? "20px" : "40px",

                fontSize: isMobile ? "10px" : "16px",
              }}
            >
              out for delivery
            </MenuItem>
            <MenuItem
              value="delivered"
              sx={{
                height: isMobile ? "20px" : "40px",

                fontSize: isMobile ? "10px" : "16px",
              }}
            >
              delivered
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

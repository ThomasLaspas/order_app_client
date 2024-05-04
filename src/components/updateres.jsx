import "../mainpage.css";
import Checkboxes from "./checkboxes";
import { useEffect, useState } from "react";
import Menu from "./menus";
import { server, handleFileUpload } from "../util/axios";
import Menudb from "./menudb";
import Loader from "./loader";
import Btnloader from "./btnloader";

export default function Upade() {
  const Token = localStorage.getItem("tok");
  const username = localStorage.getItem("name");
  const [loabtn, setloadbtn] = useState(false);
  const [err, seterror] = useState("");
  const [nameerr, setnameerr] = useState("");
  const [cityerr, setcityerr] = useState("");
  const [countryerr, setcountryerr] = useState("");
  const [priceerr, setpriceerr] = useState("");
  const [timerr, settimerr] = useState("");
  const [cousineerr, setcousineerr] = useState("");
  const [menuerr, setmenuerr] = useState("");
  const [load, setload] = useState(false);
  const [cousines, setFood] = useState([]);
  const [restaurantName, setname] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [deliveryPrice, setdeliveri] = useState(0);
  const [estimatedDeliveryTime, setestimate] = useState(0);
  const [imageUrl, setimg] = useState("");
  const [menuname, setmenuname] = useState("");
  const [meuprice, setmenuprice] = useState(0);
  const [image, setimage] = useState("");
  const [menuItems, setMenus] = useState([{ name: "", price: "" }]);
  const [time, settime] = useState(0);
  const [menudb, setmenudb] = useState([{ name: "", price: "" }]);

  const handleCreateMenu = () => {
    // Add a new menu object to the menus array
    setMenus([...menuItems, { name: "", price: "" }]);
  };

  const handleNameChange = (index, value) => {
    // Update the name of the menu at the specified index
    const updatedMenus = [...menuItems];
    updatedMenus[index].name = value;
    setMenus(updatedMenus);
  };

  const handlePriceChange = (index, value) => {
    // Update the price of the menu at the specified index
    const updatedMenus = [...menuItems];
    updatedMenus[index].price = value;
    setMenus(updatedMenus);
  };
  const handleDeleteMenu = (index) => {
    // Remove the menu at the specified index
    const updatedMenus = menuItems.filter((_, i) => i !== index);
    setMenus(updatedMenus);
  };

  const submit = async (e) => {
    e.preventDefault();
    setloadbtn(true);

    let uri;
    if (image) {
      try {
        uri = await handleFileUpload(image);
      } catch (error) {
        seterror("An error occurred while uploading the image.");
        return;
      }

      // If image upload failed or no URI returned, display error message
      if (!uri) {
        seterror(
          "File type not allowed. Please upload a PNG, JPEG, or JPG file."
        );
        return;
      }
    }
    const mergedMenuItems = [...menuItems, ...menudb];
    const data = {
      restaurantName,
      city,
      country,
      cousines,
      deliveryPrice,
      estimatedDeliveryTime,
      menuItems: mergedMenuItems.filter((item) => item.name && item.price > 0),
      img: uri || imageUrl,
    };

    try {
      const res = await server.put(`api/restaurant/update/${username}`, data, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log(res);
      seterror("");
      setcityerr("");
      setcountryerr("");
      setnameerr("");
      setcousineerr("");
      setmenuerr("");
      settimerr("");
      setcityerr("");
      alert("your estaurant updated sucesfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((error) => {
          if (
            error.path === "menuItems[0].name" ||
            error.path === "menuItems[0].price" ||
            error.path === "menuItems"
          ) {
            setmenuerr("Menu item name and price are required");
          } else if (error.path === "restaurantName") {
            setnameerr("Restaurant name is required");
          } else if (error.path === "city") {
            setcityerr("City is required");
          } else if (error.path === "country") {
            setcountryerr("Country is required");
          } else if (error.path === "estimatedDeliveryTime") {
            settimerr("Delivery time must be a positive number");
          } else if (error.path === "deliveryPrice") {
            setpriceerr("Delivery price must be a positive number");
          } else if (error.path === "cousines") {
            setcousineerr("Cousines array cannot be empty");
          }
        });
      }
    } finally {
      setloadbtn(false);
    }
  };
  useEffect(() => {
    const rest = async () => {
      setload(true);
      try {
        const res = await server.get(`api/restaurant/get/${username}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        setcity(res.data.city);
        setcountry(res.data.country);
        setFood(res.data.cousines);
        setdeliveri(res.data.deliveryPrice);
        setestimate(res.data.estimatedDeliveryTime);
        setimg(res.data.imageUrl);
        settime(res.data.lastUpdated);
        setmenudb(res.data.menuItems);
        setname(res.data.restaurantName);
      } catch (err) {
        alert("some error ocured try to refresh the page");
      } finally {
        setload(false);
      }
    };
    rest();
  }, []);
  if (load) {
    return <Loader />;
  }
  return (
    <div className="update">
      <h1>Details</h1>
      <p>Enter the details abou your restaurant</p>

      <form onSubmit={submit} className="updateform">
        <div className="inputlarge">
          {" "}
          <label for="name">Name</label>
          <input
            className="updateinput"
            type="text"
            name="name"
            value={restaurantName}
            onChange={(e) => setname(e.target.value)}
          />
          {nameerr ? <h2 className="errors">{nameerr}</h2> : null}
        </div>
        <br />
        <div className="inputtwo">
          <div>
            <label for="name">City</label>
            <br />
            <input
              className="updateinput"
              type="text"
              name="name"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              style={{ width: "100%" }}
            />
            {cityerr ? <h2 className="errors">{cityerr}</h2> : null}
          </div>

          <div>
            <label for="name">Country</label>
            <br />
            <input
              className="updateinput"
              type="text"
              name="name"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              style={{ width: "100%" }}
            />
            {countryerr ? <h2 className="errors">{countryerr}</h2> : null}
          </div>
        </div>
        <br />
        <div className="iputmed">
          {" "}
          <label for="name">Delivery price ($)</label>
          <br />
          <input
            className="updateinput"
            type="text"
            name="name"
            value={deliveryPrice}
            onChange={(e) => setdeliveri(e.target.value)}
          />
          {priceerr ? <h2 className="errors">{priceerr}</h2> : null}
        </div>
        <br />
        <div className="iputmed">
          {" "}
          <label for="name">Estimate time (min)</label>
          <br />
          <input
            className="updateinput"
            type="text"
            name="name"
            value={estimatedDeliveryTime}
            onChange={(e) => setestimate(e.target.value)}
          />
          {timerr ? <h2 className="errors">{timerr}</h2> : null}
        </div>
        <br />
        <hr />
        <br />
        <h1>Cousines</h1>
        <p>Creat eyour own menu and give each item name and price</p>

        <Checkboxes food={cousines} setFood={setFood} />
        {cousineerr ? <h2 className="errors">{cousineerr}</h2> : null}
        <br />
        <hr />
        <br />
        <h1>Menu</h1>
        <p>Creat eyour own menu and give each item name and price</p>

        {menudb.map((mn, index) => {
          return (
            <Menudb
              key={index}
              name={mn.name}
              price={mn.price}
              id={mn._id}
              restaurantName={restaurantName}
            />
          );
        })}

        {menuItems.map((menu, index) => (
          <Menu
            key={index}
            name={menu.name}
            price={menu.price}
            setname={(value) => handleNameChange(index, value)}
            setprice={(value) => handlePriceChange(index, value)}
            onDelete={() => handleDeleteMenu(index)}
          />
        ))}
        {menuerr ? <h2 className="errors">{menuerr}</h2> : null}
        <br />
        <button onClick={handleCreateMenu} type="button" className="upbtns">
          create
        </button>
        <br />
        <br />
        <br />
        <hr />
        <br />
        <h1>Image</h1>
        <p>
          Add an image that will be display on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </p>

        <img src={imageUrl} width={600} height={300} className="img" />
        <br />
        <input
          type="file"
          id="filein"
          onChange={(e) => setimage(e.target.files[0])}
        />
        <br />
        <br />
        {loabtn ? (
          <button type="submit" className="upbtns2">
            Update <Btnloader />
          </button>
        ) : (
          <button type="submit" className="upbtns">
            Update
          </button>
        )}
        {err ? <h2 className="errors">{err}</h2> : null}
      </form>
    </div>
  );
}

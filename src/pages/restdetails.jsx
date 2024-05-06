import { useEffect, useState } from "react";
import "../mainpage.css";
import { server, paycheck } from "../util/axios";
import { useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import Loader from "../components/loader";
import Btnloader from "../components/btnloader";
import { AiOutlineClose } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

export default function Details() {
  const name = localStorage.getItem("name");
  const [profemail, setprofemail] = useState("");
  const [profcity, setprofcity] = useState("");
  const [profname, setprofname] = useState(name);
  const [profadd, setprofadd] = useState("");
  const [profvillage, setprofvillage] = useState("");
  const [userid, setuserid] = useState("");
  const [restid, setrestid] = useState("");
  const { id } = useParams();
  const Token = localStorage.getItem("tok");
  const [error, seterror] = useState("");
  const [menu, setmenu] = useState([]);
  const [restaurnt, setrestaurant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [itmes, setitems] = useState([]);
  const [load, setload] = useState(false);
  const [modal, setmodal] = useState(false);
  const [loadbtn, setloadbtn] = useState(false);
  const [sidemenu, setsidemenu] = useOutletContext();

  const totalValue =
    itmes.reduce((total, item) => {
      const price = total + item.quantity * item.price;
      return price;
    }, 0) + restaurnt.deliveryPrice;

  const add = (index) => {
    setitems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = newItems[index].quantity + 1;
      return newItems;
    });
  };

  const minus = (index) => {
    setitems((prevItems) => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 0) {
        newItems[index].quantity = newItems[index].quantity - 1;
      }
      return newItems;
    });
  };

  const del = (index) => {
    const newItems = [...itmes];
    newItems.splice(index, 1); // Remove the item at the specified index
    setitems(newItems); // Update the state with the new array
  };
  const push = (name, price, id) => {
    // Check if the item already exists in the items array
    const existingItem = itmes.find(
      (item) => item.name === name && item.price === price
    );

    // If the item exists, increase its quantity by 1
    if (existingItem) {
      return;
    }

    // Otherwise, add the new item to the items array with quantity 1
    setitems((prevItems) => [
      ...prevItems,
      {
        name: name,
        price: price,
        quantity: 1,
        menuItemId: id,
      },
    ]);
  };

  const currentPosts = menu.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const rest = async () => {
      setload(true);
      try {
        const res = await server.get(`api/restaurant/getspecify/${id}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        setrestaurant(res.data);
        setmenu(res.data?.menuItems);
        setrestid(res.data._id);
      } catch (err) {
        seterror(err.response.data.message);
        alert(error);
      } finally {
        setload(false);
      }
    };
    const user = async () => {
      try {
        const res = await server.get(`api/user/get/${name}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        setprofemail(res.data.email);
        setprofcity(res.data.city);
        setprofvillage(res.data.village);
        setprofadd(res.data.adres);
        setuserid(res.data.id);
      } catch (err) {
        seterror(err.response.data.message);
        alert(error);
      }
    };
    rest();
    user();
  }, []);
  const check = async () => {
    setloadbtn(true);
    const data = {
      userid: userid,
      restid: restid,
      deliveryPrice: restaurnt.deliveryPrice,
      deliveryDetails: {
        email: profemail,

        name: profname,
        addressLine1: profadd,
        city: profcity,
      },

      cartItems: itmes,
    };

    try {
      const res = await server.put(
        "api/user/update",
        {
          email: profemail,
          village: profvillage,
          city: profcity,
          addressLine1: profadd,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const pay = await paycheck(data, Token);
      window.location.href = pay.url;
    } catch (err) {
      seterror(err.response.data.message);
      alert(error);
    } finally {
      setloadbtn(false);
    }
  };
  if (load) {
    return <Loader />;
  }
  if (sidemenu) {
    return null;
  } else {
    return (
      <div className="details">
        <section className="imagedet">
          <img src={restaurnt.imageUrl} className="full-width" />
        </section>
        <br />
        <section className="griddet">
          <div className="menudet">
            <div id="retdetails">
              <h1>{restaurnt.restaurantName}</h1>
              <h4>{restaurnt.country}</h4>
              <br />
              {restaurnt.cousines?.map((cs, index) => {
                return <p key={index}>*{cs}</p>;
              })}
            </div>
            <br />
            <h1>Menu</h1>
            {currentPosts.map((mn) => {
              return (
                <div
                  className="menudetails"
                  onClick={() => push(mn.name, mn.price, mn._id)}
                  key={mn._id}
                >
                  <h1>{mn.name}</h1>
                  <br />
                  <h3>{mn.price} €</h3>
                </div>
              );
            })}
            <br />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={menu.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          <div className="checkoutdet">
            <section className="chckoutitems">
              {itmes.map((it, index) => {
                return (
                  <div key={index} id={index} className="chckoutitemsfinal">
                    <div className="nametag">
                      <div>
                        {" "}
                        <button onClick={() => add(index)}>
                          <SlArrowUp />
                        </button>
                        <button onClick={() => minus(index)}>
                          <SlArrowDown />
                        </button>
                      </div>
                      <h3>{it.quantity}</h3>
                      <h4>{it.name}</h4>
                    </div>
                    <div id="pricetag">
                      <button onClick={() => del(index)}>
                        <SlTrash />
                      </button>
                      <h4>{it.price} €</h4>
                    </div>
                  </div>
                );
              })}

              <div className="delivery">
                <p>Delivery Cost</p>
                <h3>{restaurnt.deliveryPrice} €</h3>
              </div>
              <div className="delivery">
                <h1>Your order</h1>
                <h3>{totalValue.toFixed(2)} €</h3>
              </div>
              <div className="delivery2">
                <button onClick={() => setmodal((prev) => !prev)}>
                  Go to checkout
                </button>
              </div>
            </section>
          </div>
        </section>
        {modal ? (
          <section className="modal">
            <div className="modaldet">
              <h1>Confirm Delivery details</h1>
              <p>
                Check and update if it's necessary, your Address information
              </p>
              <br />
              <div className="inputlarge">
                {" "}
                <label htmlFor="name">Email</label>
                <input
                  className="updateinput"
                  type="text"
                  name="name"
                  value={profemail}
                  readOnly
                />
              </div>
              <br />
              <div className="inputlarge">
                {" "}
                <label htmlFor="name">Name</label>
                <input
                  className="updateinput"
                  type="text"
                  name="name"
                  value={profname}
                  onChange={(e) => setprofname(e.target.value)}
                />
              </div>
              <br />
              <div className="inputlarge">
                {" "}
                <label htmlFor="name">City</label>
                <input
                  className="updateinput"
                  type="text"
                  name="name"
                  value={profcity}
                  onChange={(e) => setprofcity(e.target.value)}
                />
              </div>
              <br />
              <div className="inputtwo">
                <div>
                  <label htmlFor="name">Village</label>
                  <br />
                  <input
                    className="updateinput"
                    type="text"
                    name="name"
                    value={profvillage}
                    onChange={(e) => setprofvillage(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label htmlFor="name">Address line</label>
                  <br />
                  <input
                    className="updateinput"
                    type="text"
                    value={profadd}
                    onChange={(e) => setprofadd(e.target.value)}
                    name="name"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <br />
              {loadbtn ? (
                <button className="paymentbtn2" onClick={check}>
                  Continue to checkout <Btnloader />
                </button>
              ) : (
                <button className="paymentbtn" onClick={check}>
                  Continue to checkout
                </button>
              )}
              <button
                className="uncheck"
                onClick={() => setmodal((prev) => !prev)}
              >
                <AiOutlineClose />
              </button>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}

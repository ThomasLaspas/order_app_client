import "../mainpage.css";
import Userorder from "../components/usersordes";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { server } from "../util/axios";
import Loader from "../components/loader";
export default function Orderstatus() {
  const [load, setload] = useState(false);
  const name = localStorage.getItem("name");
  const Token = localStorage.getItem("tok");
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchData2 = async () => {
    setload(true);
    try {
      const name = localStorage.getItem("name");
      const Token = localStorage.getItem("tok");
      const res = await server.post(
        "api/user/my-orders",
        {
          username: name,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setdata(res.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    fetchData2(); // Fetch data initially
    const intervalId = setInterval(fetchData2, 20000); // Polling interval every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Only run on mount

  return (
    <div className="ordersUser">
      {currentPosts.length > 0
        ? currentPosts.map((dt) => {
            return (
              <Userorder
                load={load}
                key={dt._id}
                value={dt.totalAmount}
                cartItems={dt.cartItems}
                img={dt.restaurant.imageUrl}
                time={dt.createdAt}
                deliverytime={dt.restaurant.estimatedDeliveryTime}
                amount={dt.totalAmount}
                status={dt.status}
                city={dt.deliveryDetails.city}
                addres={dt.deliveryDetails.addressLine1}
              />
            );
          })
        : null}
      <br />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

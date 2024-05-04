import "../mainpage.css";
import Cousinefil from "../components/cousinefilters";
import Search2 from "../components/search2";
import { useEffect, useState } from "react";
import { server } from "../util/axios";
import { useParams } from "react-router-dom";
import Pagination from "../components/pagination";

export default function Restresults() {
  const Token = localStorage.getItem("tok");
  const [cousines, setcousines] = useState([]);
  const [restaurants, setrestaurants] = useState([]);
  const { city } = useParams();
  const [trigerr, settriger] = useState(false);
  const [load, setload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const clear = () => {
    setcousines([]);
    settriger(!trigerr);
    setSelectedFilters([]);
  };
  useEffect(() => {
    const rests = async () => {
      setload(true);
      try {
        const res = await server.get(`api/restaurant/getres/${city}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        setrestaurants(res.data);
      } catch (err) {
        alert("some error occure try again");
      } finally {
        setload(false);
      }
    };
    rests();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = restaurants.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="restresult">
      <div className="divresult">
        <div className="grid1">
          <section>
            <h2 style={{ color: "white" }}>Filter by cousine</h2>
            <button id="resefilt" onClick={clear}>
              Reset filters
            </button>{" "}
          </section>{" "}
          <Cousinefil
            setcousines={setcousines}
            cousines={cousines}
            trigerr={trigerr}
            settriger={settriger}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className="grid2">
          <section className="ingrid2">
            <Search2
              cousines={cousines}
              restaurants={restaurants}
              setrestaurants={setrestaurants}
              setcousines={setcousines}
              settriger={settriger}
              trigerr={trigerr}
              setload={setload}
              currentPosts={currentPosts}
            />
            <br />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={restaurants.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

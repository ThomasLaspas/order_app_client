import { useEffect, useState } from "react";
import "../mainpage.css";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cardrest from "./cardrest";
import { useParams } from "react-router-dom";
import { server } from "../util/axios";

export default function Search2({
  cousines,
  restaurants,
  setrestaurants,
  setcousines,
  trigerr,
  settriger,
  setload,
  currentPosts,
}) {
  const [query, setquery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const Token = localStorage.getItem("tok");
  let { city } = useParams();
  const [cousine, setcousine] = useState("");

  const [sorted, setsorted] = useState("");

  useEffect(() => {
    const filters = async () => {
      setload(true);
      try {
        const res = await server.post(
          `api/restaurant/search/${city}`,
          {
            cousines: cousines,
            cousine: cousine,
            sorted: sorted,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        setrestaurants(res.data.rests);
      } catch (err) {
        console.log(err);
        alert("Something wrong happend try again");
      } finally {
        setload(false);
      }
    };
    filters();
  }, [trigerr]);

  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState("");

  // Options for the dropdown
  const options = [
    "Sorted by best match",
    "estimatedDeliveryTime",
    "deliveryPrice",
  ];

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setsorted(option);
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
    settriger(!trigerr);
  };
  const submit = () => {
    setcousines([]);
    settriger(!trigerr);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };
  return (
    <div className="details">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          name=""
          value={cousine}
          onChange={(e) => setcousine(e.target.value)}
          placeholder="Search something"
          onKeyDown={handleKeyDown}
        />
        <button className="searchButton" onClick={submit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <br />
      <div className="lastfilt">
        <section>
          <h1>
            {restaurants.length} Restaurants found in {city}
          </h1>
          <Link to="/" id="changeloc">
            Change location
          </Link>
        </section>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption || "Sorted by best match"}
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  <p id="p">{option}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {currentPosts.length > 0 ? (
        currentPosts.map((rs) => {
          return (
            <Cardrest
              cousines={rs.cousines}
              name={rs.restaurantName}
              img={rs.imageUrl}
              time={rs.estimatedDeliveryTime}
              price={rs.deliveryPrice}
              key={rs._id}
              id={rs._id}
            />
          );
        })
      ) : (
        <h1>No match found</h1>
      )}
      <br />
    </div>
  );
}

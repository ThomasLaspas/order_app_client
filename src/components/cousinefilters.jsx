import "../mainpage.css";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";

export default function Cousinefil({
  setcousines,
  cousines,
  settriger,
  trigerr,
  setSelectedFilters,
  selectedFilters,
}) {
  const handleClick = (cousineName) => {
    let updatedSelectedFilters;
    if (selectedFilters.includes(cousineName)) {
      // Remove the cousineName from selected filters if already selected
      updatedSelectedFilters = selectedFilters.filter(
        (filter) => filter !== cousineName
      );
    } else {
      // Add the cousineName to selected filters if not selected
      updatedSelectedFilters = [...selectedFilters, cousineName];
    }
    setSelectedFilters(updatedSelectedFilters);
    setcousines(updatedSelectedFilters);
    settriger(!trigerr);
  };
  const filters = [
    "Greek",
    "Coffee",
    "Sushi",
    "BBQ",
    "Steak",
    "American",
    "Vegan",
    "Indian",
    "Chinese",
    "Tacos",
    "Tapas",
    "Spanish",
    "French",
    "Pizza",
    "Spicy",
    "Giros",
    "Grill",
    "Crepes",
    "Club Sandwich",
    "Pasta",
  ];
  const [displayCount, setDisplayCount] = useState(7); // Number of filters to display initially

  const handleShowMore = () => {
    setDisplayCount(filters.length); // Show all filters when "Show More" is clicked
  };
  const handleShowLess = () => {
    setDisplayCount(7); // Reset display count to 7 when "Show Less" is clicked
  };
  return (
    <div className="filter">
      {filters.slice(0, displayCount).map((fl, index) => (
        <div
          className={`cousfil ${
            selectedFilters.includes(fl) ? "green-border" : ""
          }`}
          key={index}
        >
          <h4 onClick={() => handleClick(fl, index)}>{fl}</h4>
        </div>
      ))}
      {displayCount < filters.length ? ( // Render "Show More" button if not displaying all filters
        <>
          <button onClick={handleShowMore}>
            Show More <BiChevronDown />
          </button>
        </>
      ) : (
        <button onClick={handleShowLess}>
          Show Less <BiChevronUp />
        </button> // Render "Show Less" button if displaying all filters
      )}
    </div>
  );
}

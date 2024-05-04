import { useState, useEffect } from "react";
import "../mainpage.css";

export default function Checkboxes({ food, setFood }) {
  const [selectedFood, setSelectedFood] = useState([]);

  useEffect(() => {
    // Initialize selected food array based on the food array received from props
    setSelectedFood(food);
  }, [food]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // If checkbox is checked, add the value to the selected food array
      setSelectedFood([...selectedFood, value]);
      setFood([...food, value]);
    } else {
      // If checkbox is unchecked, remove the value from the selected food array
      setSelectedFood(selectedFood.filter((item) => item !== value));
      setFood(food.filter((item) => item !== value));
    }
  };

  return (
    <div className="cheboxes">
      {[
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
      ].map((foodType) => (
        <div className="checkbox" key={foodType}>
          <input
            type="checkbox"
            name="foodType"
            value={foodType}
            className="foodtypechecks"
            onChange={handleCheckboxChange}
            checked={selectedFood.includes(foodType)} // Check if foodType is in selectedFood array
          />
          <label className="Checkbox-label">{foodType}</label>
        </div>
      ))}
    </div>
  );
}

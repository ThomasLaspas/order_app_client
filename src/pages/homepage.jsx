import "../mainpage.css";
import food1 from "../../food1.png";
import food4 from "../../food5.jpeg";
import food2 from "../../food6.jpeg";
import food3 from "../../food7.jpeg";
import { useState, useEffect } from "react";
import Saerch from "../components/search";
import { useOutletContext } from "react-router-dom";

export default function Mainp() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sidemenu, setsidemenu] = useOutletContext();

  const images = [food4, food2, food3];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Increment index cyclically
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className="mainpage">
      <div className="container">
        <img src={food1} className="img" />
      </div>
      {sidemenu ? null : <Saerch />}
      <br />
      <div className="containersliders">
        <img src={images[currentImageIndex]} className="img" alt="Food" />
      </div>
    </div>
  );
}

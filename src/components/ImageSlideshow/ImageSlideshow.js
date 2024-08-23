import React, { useState, useEffect } from 'react';
import './ImageSlideshow.css'; // Create a CSS file for styling
import bg1 from "../../assets/bg/1.png";
import bg2 from "../../assets/bg/2.png";
import bg3 from "../../assets/bg/3.png";
import bg4 from "../../assets/bg/4.png";
import bg5 from "../../assets/bg/5.png";
import bg6 from "../../assets/bg/6.png";
import bg7 from "../../assets/bg/7.png";

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="slideshow-container">
      <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
      <div className="slideshow-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
// src/components/Carousel.js
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Carousel = ({images}) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.carouselContainer}>
      <img src={images[current]} alt="slide" style={styles.image} />
      <button onClick={prevSlide} style={styles.leftArrow}>
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} style={styles.rightArrow}>
        <FaChevronRight />
      </button>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  leftArrow: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    zIndex: 2,
  },
  rightArrow: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    zIndex: 2,
  },
};

export default Carousel;

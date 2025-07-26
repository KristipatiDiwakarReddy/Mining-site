import React, {useEffect} from 'react';
import { ServicesSection } from '../pages/Home'; // Import the ServicesSection component
import Carousel from "./components/Carousel";
import { defaultContent as content } from "../content";

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
  "/images/Top Slider/mining pictures 6.jpg"
];

function Services() {

  // Set body background color to red on mount, reset on unmount
    useEffect(() => {
      const prev = document.body.style.backgroundColor;
      document.body.style.backgroundColor = '#f1f1f1';
      return () => {
        document.body.style.backgroundColor = prev;
      };
    }, []);
  return (
    <>
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <div style={{ marginBottom: -60 }}>
         <ServicesSection />
      </div>
    </div>
    </>
  );
}

export default Services;
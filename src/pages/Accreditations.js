import React, { useEffect } from 'react';
import Carousel from "./components/Carousel";
import "../css/Accreditations.css";
import { defaultContent as content } from "../content";

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
  "/images/Top Slider/mining pictures 6.jpg"
];

function Accreditations() {
  // Set body background color to red on mount, reset on unmount
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#f1f1f1';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  // Helper: get PDF path for each accreditation
  const getPdfPath = (index) => `/pdfs/accreditation${index + 1}.pdf`;

  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <div className="accreditations-section" style={{ position: 'relative', top: 25 }}>
        <h2>{content.accreditations.heading}</h2>
        <div className="accreditations-grid">
          {[...Array(content.accreditations.count)].map((_, index) => (
            <a
              key={index}
              href={getPdfPath(index)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', background: "#ffffff" }}
            >
              <img
                src={`/images/accreditation/accreditation${index + 1}.jpg`}
                alt={`Accreditation ${index + 1}`}
                className="accreditation-image"
                style={{ cursor: 'pointer' }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accreditations;
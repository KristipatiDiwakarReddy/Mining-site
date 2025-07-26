import React from "react";
import { defaultContent as content } from "../content";
import Carousel from "./components/Carousel";
import ClientsCarousel from "./components/ClientsCarousel";
import ImagePan from "../components/ImagePan";
import { useNavigate } from 'react-router-dom';
import '../css/ServicesSection.css'; // styles below
import '../css/Accreditations.css';

import { useTheme, useMediaQuery } from '@mui/material';

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
  "/images/Top Slider/mining pictures 6.jpg"
];

const clientImages = [
  "/images/Clients/1.png",
  "/images/Clients/2.png",
  "/images/Clients/3.png",
  "/images/Clients/4.png",
  "/images/Clients/5.png",
  "/images/Clients/6.png",
  "/images/Clients/7.png"
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (service) => {
    const slug = service.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    navigate(`/services/${slug}`);
  };

  return (
    <div className="services-container">
      <h2>{content.home.servicesHeading}</h2>
      <div className="services-grid">
        {(content.home.services || []).map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => handleCardClick(service)}
          >
            <img
              src={`../images/${service}.png`} // Placeholder image, replace with actual service images
              alt={service}
              className="service-image"
            />
            <p className="service-title">{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ServicesSection };

function Home() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getPdfPath = (index) => `/pdfs/accreditation${index + 1}.pdf`;

  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <div style={{ padding: isMobile ? "20px 20px" : "20px 100px" }}>
        <p>{content.home.intro1}</p>
        <p>{content.home.intro2}</p>
        <p>{content.home.intro3}</p>
        {/* More sections... */}
      </div>
      <ImagePan />
      <ServicesSection />

      <div className="accreditations-section">
        <h2>Our Accreditations</h2>
        <div className="accreditations-grid">
          {[...Array(12)].map((_, index) => (
            <a
              key={index}
              href={getPdfPath(index)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
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


      <div style={{ padding: isMobile ? null : "20px 100px", textAlign: "center" }}>
        <h2 style={ {fontSize: "2rem"} } >Our Clients</h2>
      <ClientsCarousel images={clientImages}/>
      </div>

    </div>
  );
}

export default Home;
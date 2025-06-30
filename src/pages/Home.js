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

const services = ["MINING", "SURVEY", "ENVIRONMENT", "LABORATORY", "GEOLOGY"];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (service) => {
    const slug = service.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    navigate(`/services/${slug}`);
  };

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}service
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
        {/* <p>{content.home.paragraph}</p>
        <p>{content.home.paragraph2}</p>
        <p>{content.home.paragraph3}</p> */}

        <p>
          <strong>GLOBAL ENVIRONMENT & MINING SERVICES LLP</strong>, an{" "}
          <span style={{ color: "green" }}>
            ISO 9001:2008, OHSAS 18001:2007 certified
          </span>{" "}
          company, offers International Multidisciplinary Consultancy and Services in
          Mining Engineering – Pre-feasibility reports, Geology, Mine Survey, Mine
          Evaluation & Mineral Economics, Mine Planning and Design, Mine Closure Plans,
          Environment, CSR Activities, Pre-Post-Current Statutory Clearances and
          various other aspects of Mining and Quarrying.
        </p>

        <p>
          <strong>Offers Innovative, Simple, Creative and Focused</strong> solutions to achieve
          <b>“The Best”</b> 
          results under time, and budget constraints. Total Solutions at all stages of the mine –
          from Evaluation of Remote location Green Field virgin mineral deposits, Pre-feasibility reports,
          Investment decisions, obtaining all Pre-operative statutory clearances, Exploration, Mine Planning & 
          Development, Operations, Safety, Environment, CSR Activities, etc right upto Mine Closure and Post Mining Activities.
        </p>

        <p>
          We assist in Strategic planning and execution of Mining and Environment projects with the
          <b>‘Smart (right) moves at the Right time’</b>
          approach, keeping the long term in the Perspective, to ensure environment friendly techno-economic
          operations with Optimum utilization of resources, Safety, Profitability, Sustainable development 
          and Social awareness thereby giving a competitive edge to the mining projects and operations,
          to stand ahead as Industry Leaders in the changing and versatile economic and market conditions that
          the mineral industry is experiencing these days.
        </p>

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
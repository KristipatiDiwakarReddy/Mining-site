import React from 'react';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
  desktop: { breakpoint: { max: 1200, min: 900 }, items: 3 },
  tablet: { breakpoint: { max: 900, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 }
};

const galleryTitles = content.gallery.galleryTitles;

// Example image arrays for each carousel (update with your actual image filenames)
const galleryImages1 = [
  '/images/slider-02.jpg',
  '/images/slider-03.jpg',
  '/images/MINING.png',
  '/images/SURVEY.png',
  '/images/ENVIRONMENT.png',
  '/images/LABORATORY.png',
  '/images/GEOLOGY.png',
];
const galleryImages2 = [
  '/images/Industry Images/Extra-1.webp',
  '/images/Industry Images/Extra-2.jpg',
  '/images/Industry Images/Extra-3.webp',
  '/images/Industry Images/Extra-4.jpg',
  '/images/Industry Images/Extra-5.jpg',
  '/images/Industry Images/Extra-6.jpg',
  '/images/Industry Images/Extra-7.avif',
  '/images/Industry Images/Extra-8.webp',
];
const galleryImages3 = [
  '/images/Instruments/(Gas Chromatography) Perkinelmer.png',
  '/images/Instruments/AAQ Monitoring Air.jpg',
  '/images/Instruments/AAS (Atomic Absorption Spectroscopy).jpg',
  '/images/Instruments/AAS PE-AAnalyst.jpg',
  '/images/Instruments/aluminium-benzene-sampler.jpg',
  '/images/Instruments/Autoclave (Triple wall Vertical Hi-Pressure-Nut).jpeg',
];
const galleryImages4 = [
  '/images/Industry Images/Extra-1.webp',
  '/images/Industry Images/Extra-2.jpg',
  '/images/Industry Images/Extra-3.webp',
  '/images/Industry Images/Extra-4.jpg',
  '/images/Industry Images/Extra-5.jpg',
  '/images/Industry Images/Extra-6.jpg',
  '/images/Industry Images/Extra-7.avif',
  '/images/Industry Images/Extra-8.webp',
];

const Gallery = () => (
  <>
  <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
  <div style={{ padding: '40px 0', backgroundColor: '#f1f1f1', marginBottom: -64 }}>
    <h1 style={{ textAlign: 'center', color: '#1976d2', fontWeight: 700, marginBottom: 40 }}>{content.gallery.heading}</h1>
    {[
      galleryImages1,
      galleryImages2,
      galleryImages3,
      galleryImages4
    ].map((images, idx) => (
      <div key={idx} style={{ margin: '40px auto', maxWidth: 1200 }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1976d2', marginBottom: 20 }}>{galleryTitles[idx]}</h2>
        <style>{`
              .react-multi-carousel-list {
                height: 250px !important;
              }
          `}</style>
        <MultiCarousel
          responsive={responsive}
          infinite
          autoPlay={true}
          autoPlaySpeed={5000}
          arrows
          showDots
          containerClass={`gallery-carousel-${idx}`}
          itemClass="carousel-item-padding-40-px"
        >
          {images.map((img, i) => (
            <div key={i} style={{ padding: 10 }}>
              <img
                src={img}
                alt={`${galleryTitles[idx]} Image ${i + 1}`}
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
            </div>
          ))}
        </MultiCarousel>
      </div>
    ))}
  </div>
  </div>
  </>
);

export default Gallery;
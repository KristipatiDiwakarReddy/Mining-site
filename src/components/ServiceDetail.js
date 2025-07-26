import React from 'react';
import { useParams } from 'react-router-dom';
import { defaultContent as content } from '../content';
import Carousel from "../pages/components/Carousel";
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = content.servicesDetails[slug];

  if (!service) {
    return <div>Service not found</div>;
  }

  // Helper to render details
  const renderDetails = (details) => {
    if (Array.isArray(details)) {
      return (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {details.map((detail, index) => (
            <li key={index} style={{
              padding: '12px 0',
              borderBottom: index < details.length - 1 ? '1px solid #eee' : 'none',
              fontSize: '1.1rem',
              color: '#555',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px', color: '#4CAF50', fontSize: '1.2rem' }}>•</span>
              {detail}
            </li>
          ))}
        </ul>
      );
    } else if (typeof details === 'object' && details !== null) {
      // For laboratory: details is an object with subheadings
      return (
        <div>
          {Object.entries(details).map(([section, items], idx) => (
            <div key={section} style={{ marginBottom: '28px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: '18px 0 10px 0' }}>{section}:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item, i) => (
                  <li key={i} style={{
                    padding: '10px 0',
                    borderBottom: i < items.length - 1 ? '1px solid #eee' : 'none',
                    fontSize: '1.1rem',
                    color: '#555',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ marginRight: '10px', color: '#4CAF50', fontSize: '1.2rem' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  // Carousel responsive config for multi-item carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
    desktop: { breakpoint: { max: 1200, min: 900 }, items: 3 },
    tablet: { breakpoint: { max: 900, min: 600 }, items: 2 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1 }
  };

  return (
    <>
      <div style={{ position: "relative", top: -64 }}>
        {/* Carousel for service images */}
        {service.images && Array.isArray(service.images) && service.images.length > 0 && (
          <Carousel images={service.images} />
        )}
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center'
          }}>{service.title}</h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '40px',
            textAlign: 'center'
          }}>{service.description}</p>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#444',
              marginBottom: '20px'
            }}>Our Services Include:</h2>
            {renderDetails(service.details)}
          </div>

          {/* New multi-item carousel below renderDetails */}
          <div style={{ margin: '40px 0' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1976d2', marginBottom: 20 }}>Gallery</h2>
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
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {(service.galleryImages || service.images || []).map((img, idx) => (
                <div key={idx} style={{ padding: 10 }}>
                  <img
                    src={img}
                    alt={`Gallery ${service.title} ${idx + 1}`}
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
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
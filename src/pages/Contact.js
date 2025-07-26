//1st version

import React from "react";
import { Box, Typography, Grid, Paper, Link as MuiLink } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LanguageIcon from "@mui/icons-material/Language";
import Carousel from "./components/Carousel";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { defaultContent as content } from "../content";

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg",
  "/images/Top Slider/mining pictures 6.jpg"
];

// Map icons to contact details for rendering
const iconMap = {
  Email: <EmailIcon sx={{ color: "#1976d2", fontSize: 32 }} />,
  Telephone: <PhoneIcon sx={{ color: "#43a047", fontSize: 32 }} />,
  "Mobile Number": <SmartphoneIcon sx={{ color: "#fbc02d", fontSize: 32 }} />,
  WhatsApp: <WhatsAppIcon sx={{ color: "#25d366", fontSize: 32 }} />,
  Website: <LanguageIcon sx={{ color: "#0288d1", fontSize: 32 }} />
};
const addressIconMap = {
  "Head Office": <HomeIcon sx={{ color: "#8e24aa", fontSize: 32 }} />,
  "Bengaluru Office": <LocationCityIcon sx={{ color: "#e53935", fontSize: 32 }} />
};

const contactDetails = (content.contact.contactDetails || []).map(item => ({
  ...item,
  icon: iconMap[item.label] || null
}));
const addressDetails = (content.contact.addressDetails || []).map(item => ({
  ...item,
  icon: addressIconMap[item.label] || null
}));

const Contact = () => {
  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <Box sx={{ minHeight: "100vh", py: 6 }}>
        <Paper elevation={6} sx={{ maxWidth: 1000, mx: "auto", p: 5, borderRadius: 4, background: "#fff" }}>
          <Typography variant="h3" align="center" fontWeight={700} color="#1976d2" gutterBottom>
            {content.contact.heading}
          </Typography>
          <Grid container flexDirection="column" spacing={3} sx={{ mt: 2 }}>
            {contactDetails.map((item, idx) => (
              <Grid item xs={12} sm={6} key={item.label}>
                <Box display="flex" alignItems="center" gap={2}>
                  {item.icon}
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} color="#333">
                      {item.label}
                    </Typography>
                    <MuiLink href={item.link} target="_blank" underline="hover" color="inherit" sx={{ fontSize: 18 }}>
                      {item.value}
                    </MuiLink>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}>
            <Typography variant="h5" fontWeight={700} color="#43a047" gutterBottom>
              Our Offices
            </Typography>
            <Grid container spacing={3}>
              {addressDetails.map((item, idx) => (
                <Grid item xs={12} sm={6} key={item.label}>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    {item.icon}
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} color="#333">
                        {item.label}
                      </Typography>
                      <Typography variant="body1" color="#555" sx={{ fontSize: 16 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Contact;
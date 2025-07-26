import React from 'react';
import Carousel from "./components/Carousel";
import { useParams } from 'react-router-dom';
 import { Box, Typography, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import slide1 from "../images/slider-02.jpg";
import slide2 from "../images/slider-03.jpg";
import { defaultContent } from '../content';
const images = [slide1, slide2];

function TeamMember() {
  const { name } = useParams();
  const teamMembers = defaultContent.about && defaultContent.about.teamMembers;
  const member = teamMembers && teamMembers[name];
  if (!member) return <Typography variant="h5">Team member not found.</Typography>;

  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          mt: { xs: 2, md: 8 },
          p: { xs: 1, sm: 2, md: 3 },
          background: '#fff',
          borderRadius: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 2, md: 4 }
        }}
      >
        <Avatar src={member.image} sx={{ width: { xs: 120, md: 180 }, height: { xs: 120, md: 180 }, mr: { md: 4, xs: 0 }, mb: { xs: 2, md: 0 } }} />
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="h4" color="primary" fontWeight={700} mb={2}>{member.name}</Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Biography</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{member.biography}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Expertise</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Array.isArray(member.expertise) ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {member.expertise.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <Typography>{member.expertise}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Position</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Array.isArray(member.position) ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {member.position.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <Typography>{member.position}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </div>
  );
}

export default TeamMember;

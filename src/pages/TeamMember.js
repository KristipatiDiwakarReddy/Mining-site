import React from 'react';
import Carousel from "./components/Carousel";
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import slide1 from "../images/slider-02.jpg";
import slide2 from "../images/slider-03.jpg";
const images = [slide1, slide2];

const teamDetails = {
  gulhane: {
    name: 'Dr. D. N. Gulhane',
    image: '/images/team/person2.jpg',
    biography: 'Over 27 years Geological experience in various minerals like Iron ore, Manganese, Lignite, Gold, Diamond, Copper, Chromite, Limestone, Dolomite, Magnesite, Quartz etc.',
    expertise: [
      'Approved Ph.D degree by Rand University (South Africa).',
      'Expertise in Sampling, Designing of Scheme of Exploration, Ore Modelling, Ore Reserves Estimation, Mine Planning, Mine Evaluation, Mine Designing and Techno-Economic feasibility study of mineral deposits.',
      'Evaluated and assessed number of mineral deposits in India, Australia, China, South Africa, Zambia, Mali, Georgia, Philippines, Indonesia, Malaysia, Srilanka, Thailand etc.',
      'Leading Consultant with 160 approved mining plan / mining scheme, Progressive Mine Closure Plans for opencast and underground mines, 15 EIA / EMP for mines, beneficiation & washing Plants and 10 forest proposals in mining and beneficiation field.',
      'Presented number of research papers in national and international conferences on various topics related to Geology, Ground water, beneficiation and Mine planning.'
    ],
    position: [
      "Accredited Coordinator for ‘A’ Category mines, Beneficiation and Pellet plant by National Accreditation Board for Education & Training (NABET), QCI.",
      "Expertise in Mineralogical studies & Beneficiation and carried our extensive research on Mineralogy, resources and beneficiation of Banded Haematite Quartzite (BHQ) / Low grade iron ore of entire Hospet / Bellary sector.",
      "Worked as Sr. Manager (Geology) in Sociedade De Fomento Industrial Ltd Goa and Vijaynagar Minerals Pvt Ltd (A Joint venture company of JSW Steels & Mysore Minerals Limited)."
    ]
  },
  rao: {
    name: 'S.KAMESWARA RAO',
    image: '/images/team/person1.jpg',
    biography: 'Over 20 years of Experience in Mine Survey, Detailed Topographical survey, Environmental Engineering, Environmental & Chemical Laboratories, Preparation of Mine Plans for Open pit mines, Quarries, Sand Mining and Underground Mining. Preparation of EIAs, EMPS, Mine Closure Plans, Forest proposals, Proposal for State Pollution Control Board. Prepared more than 500 mechanized mining plans, Mining schemes, Quarry plans, Sand Mining plans, etc. Preparation of Application for PL / ML, Exploration by Core Drilling, Preparation of Exploration reports, Land acquisition, Application for Mining lease, Processing, obtaining the statutory clearance etc., and Monitoring of Mining operations as per the MMRD.',
    expertise: [
      'Expert in preparation of Mining plans, Mining schemes, PMCPs, Quarry plans, Sand Mining plans etc.',
      'Preparation of EIA / EMP for various minerals for various states.',
      'Preparation of forest proposals, and liaison at various levels.',
      'Closely worked with Teams in Geological Mapping, Exploration, Drill hole Surveys, Ore Reserve estimations, Quantity Surveys, Mine Development, Mine Production, Waste dumps, Stock piles, Sub grade Mineral Stocks, etc.',
      'Survey of Remote location and Primary (initial) Surveys for new mining and infrastructure projects even before any approach road and basic infrastructure is developed.',
      'Precision Surveys related to Construction of Crushing and Screening plants, Mineral Processing plants, Beneficiation Plants, Roads, Railway Sidings, Infrastructure Development and structures, and various other related surveys.',
      'Underground surveys and Preparation of Underground Mining plans for Hutti Gold Mines for their group of Mines.',
      'Use of the Latest Survey Instruments like, Total stations, DGPS, Pentax, Sokkia, etc.',
      'Mine planning & mine designing through latest software.',
      'Completed more 50 Mines DGPS surveys in Goa state.',
      'Kolhapur Dist. Bauxite Mines Mining Plans / Mining scheme, Expansion in production, Forest proposals, DGPS surveys are completed.'
    ],
    position: 'ENV.ENGINEER & SURVEYOR, B.Sc, DEE',
  },
  Muneeswaran: {
    name: 'Dr.S.Muneeswaran',
    image: '/images/team/person3.jpg',
    biography: `Dr. S. Muneeswaran is a Ph.D. holder and Senior Scientist with 35+ years of experience in environmental services.\n\nHe is currently serving as the Senior Scientist & Head at Vimta Labs Limited, Tamil Nadu.\n\nHe is a NABET-accredited EIA Coordinator and Functional Area Expert since 2010, having worked across multiple sectors and regions in India.`,
    expertise: [
      'Led over 400 Environmental Impact Assessment (EIA) projects and prepared 200+ Detailed Project Reports across India.',
      'Specialized in sectors including mining, thermal power, cement, petroleum, infrastructure, and SEZs.',
      'Proficient in air, water, wastewater monitoring, CRZ studies, GIS-based planning, and environmental compliance documentation.'
    ],
    position: [
      'Designation: Senior Scientist & Head.',
      'Certifications: NABET-approved EIA Coordinator and QCI-certified Functional Area Expert in Air and Noise (since 2009).'
    ]
  }
};

function TeamMember() {
  const { name } = useParams();
  const member = teamDetails[name];
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

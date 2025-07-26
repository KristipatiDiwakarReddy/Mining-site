// import React from 'react';
// import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import Carousel from "./components/Carousel";
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';

// const images = [
//   "/images/Top Slider/mining pictures 2.jpg",
//   "/images/Top Slider/mining pictures 3.jpg",
//   "/images/Top Slider/mining pictures 4.jpg",
//   "/images/Top Slider/mining picture 5.jpg",
//   "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
//   "/images/Top Slider/mining pictures 6.jpg"
// ];

// const team = [
//   {
//     name: 'S.KAMESWARA RAO',
//     key: 'rao',
//     title: 'ENV.ENGINEER & SURVEYOR',
//     details: 'B.Sc, DEE',
//     experience: 'Over 24 years of Experience in Mine Survey, Detailed Topographical survey, Environmental Engineering, Environmental & Chemical Laboratories,…',
//     image: '/images/team/person1.jpg',
//     more: 'More about KAMESWARA RAO:'
//   },
//   {
//     name: 'Dr.D.N.Gulhane',
//     key: 'gulhane',
//     title: 'MINING GEOLOGIST',
//     details: 'M.Sc.(Min.Explo), M.Phil, Ph.D.(Geology), RQP, FGI',
//     experience: 'Over 31 years Geological experience in various minerals like Iron ore, Manganese, Lignite, Gold, Diamond, Copper, Chromite, Limestone, Dolomite, Magnesite, Quartz etc…',
//     image: '/images/team/person2.jpg',
//     more: 'More about GULHANE:'
//   }
//   ,
//   {
//     name: 'Dr.S.Muneeswaran',
//     key: 'Muneeswaran',
//     title: 'Senior Scientist',
//     details: 'Ph.D., M.E., M.Sc.,PGDCA',
//     experience: 'Over 31 years Geological experience in various minerals like Iron ore, Manganese, Lignite, Gold, Diamond, Copper, Chromite, Limestone, Dolomite, Magnesite, Quartz etc…',
//     image: '/images/team/person3.jpg',
//     more: 'More about GULHANE:'
//   }
// ];

// function About() {
//   const navigate = useNavigate();
//   return (
//     <div style={{ position: "relative", top: -64 }}>
//       <Carousel images={images} />
//       <Box sx={{ background: '#f7f9fa', minHeight: '100vh', py: 6, marginBottom: '-64px'}}>
//         <Box sx={{ maxWidth: 1300, mx: 'auto', p: 3, background: '#fff', borderRadius: 4, paddingBottom:'60px'  }}>
//           <Typography variant="h4" align="center" fontWeight={700} gutterBottom color="primary.main">
//             Who are We
//           </Typography>
//           <Typography variant="body1" color="text.secondary" mb={4}>
//             Conceived by <b>PROFESSIONALS</b> with GLOBAL experience and a passion for new ideas, <b>GLOBAL ENVIRONMENT & MINING SERVICES</b> has a strong team of dedicated and highly experienced Mining Engineers, Geologists, Environment Engineers, Surveyors and Software experts with over 20–27 years of experience.
//           </Typography>
//           <Typography variant="body1" color="text.secondary" mb={4}>
//             We employ enthusiastic, talented staff with unique skills and a deep drive that has enabled us to quickly set impeccable standard in the mining industry with total commitment to Safety, Environment and Society to establish “Pleasant” Mining Operations with Sustainable development.
//           </Typography>
//           <Typography variant="h4" align="center" fontWeight={600} mt={6} mb={3} color="primary.main">
//             Management Team
//           </Typography>
//           <Grid container spacing={4} justifyContent="space-evenly">
//             {team.map((member) => (
//               <Grid item xs={12} sm={6} md={4} key={member.name}>
//                 <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width:'250px' }}>
//                   <Avatar src={member.image} sx={{ width: 120, height: 120, mb: 2 }} />
//                   <Typography variant="h6" fontWeight={700} align="center">
//                     {member.name}
//                   </Typography>
//                   <Typography variant="subtitle2" color="primary" align="center">
//                     {member.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" align="center" mb={1}>
//                     {member.details}
//                   </Typography>
//                   <Button variant="contained" size="small" sx={{ mt: 'auto' }} onClick={() => navigate(`/team/${member.key}`)}>
//                     More about {member.name.split(' ')[0]}
//                   </Button>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default About;

import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Carousel from "./components/Carousel";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { defaultContent as content } from "../content";

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
  "/images/Top Slider/mining pictures 6.jpg"
];

function About() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
      <Box sx={{ background: '#f7f9fa', minHeight: '100vh', py: 6, marginBottom: '-64px'}}>
        <Box sx={{ maxWidth: 1300, mx: 'auto', p: 3, background: '#fff', borderRadius: 4, paddingBottom:'60px'  }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom color="primary.main">
            {content.about.whoAreWe}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {content.about.intro}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {content.about.staffNote}
          </Typography>
          <Typography variant="h4" align="center" fontWeight={600} mt={6} mb={3} color="primary.main">
            {content.about.managementTeamHeading}
          </Typography>
          {/* Team Section */}
          <Grid container spacing={4} justifyContent="space-evenly">
            {content.about.team.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.name} sx={{ marginBottom: '20px' }}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width:'250px' }}>
                  <Avatar src={member.image} sx={{ width: 120, height: 120, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" align="center">
                    {member.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" mb={1}>
                    {member.details}
                  </Typography>
                  <Button variant="contained" size="small" sx={{ mt: 'auto' }} onClick={() => navigate(`/team/${member.key}`)}>
                    More about {member.name.split(' ')[0]}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default About;
// src/AdminPage.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Carousel from "./components/Carousel";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultContent as content } from "../content";
import { Box, Typography, Button, Paper, TextField, CircularProgress, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const sectionOrder = [
  'header', 'footer', 'home', 'services', 'accreditations', 'gallery', 'about', 'contact', 'servicesDetails', 'login', 'admin', 'teamMembers'
];

const images = [
  "/images/Top Slider/mining pictures 2.jpg",
  "/images/Top Slider/mining pictures 3.jpg",
  "/images/Top Slider/mining pictures 4.jpg",
  "/images/Top Slider/mining picture 5.jpg",
  "/images/slider-03.jpg", // This one is in src, so you can import as before if needed
  "/images/Top Slider/mining pictures 6.jpg"
];

const AdminPage = () => {
  const [stateContent, setStateContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "site_content", "content");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStateContent(docSnap.data());
      } else {
        alert("Content document does not exist");
      }
    };
    fetchContent();
  }, []);

  const handleChange = (section, field, value, idx, key) => {
    setStateContent(prev => {
      // For array-of-object fields (like nav, servicesDropdown, etc.)
      if (typeof idx === 'number' && key) {
        const arr = Array.isArray(prev[section][field]) ? [...prev[section][field]] : [];
        arr[idx] = { ...arr[idx], [key]: value };
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: arr
          }
        };
      }
      // For normal fields
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "site_content", "content"), stateContent);
      alert("Content updated successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    }
    setSaving(false);
  };

  if (!stateContent) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;

  const sectionKeys = sectionOrder.filter(key => key in stateContent).concat(Object.keys(stateContent).filter(k => !sectionOrder.includes(k)));

  return (
    <div style={{ position: "relative", top: -64 }}>
      <Carousel images={images} />
    <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h3" align="center" fontWeight={700} color="primary" mb={4}>
        {content.admin.heading}
      </Typography>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            const selectedKey = sectionKeys[v];
            setTab(v);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          {sectionKeys.map((sectionKey, idx) => (
            <Tab key={sectionKey} label={sectionKey.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} />
          ))}
        </Tabs>
        {sectionKeys.map((sectionKey, idx) => (
          <div key={sectionKey} hidden={tab !== idx}>
            <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 0, border: '1px solid #eee' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                <Typography variant="h5" fontWeight={600}>{(stateContent[sectionKey]?.heading || sectionKey.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()))}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {sectionKey === 'teamMembers' || (sectionKey === 'about' && stateContent.about && stateContent.about.teamMembers) ? (
                  // Support both root-level and about.teamMembers
                  Object.entries(
                    sectionKey === 'teamMembers'
                      ? stateContent.teamMembers || {}
                      : (stateContent.about.teamMembers || {})
                  ).map(([key, member]) => (
                    <Box key={key} mb={4} p={2} sx={{ background: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight={600} mb={2}>{member.name || key}</Typography>
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Name</Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={member.name || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              if (sectionKey === 'teamMembers') {
                                updated.teamMembers = { ...updated.teamMembers };
                                updated.teamMembers[key] = { ...updated.teamMembers[key], name: e.target.value };
                              } else {
                                updated.about = { ...updated.about };
                                updated.about.teamMembers = { ...updated.about.teamMembers };
                                updated.about.teamMembers[key] = { ...updated.about.teamMembers[key], name: e.target.value };
                              }
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Image</Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={member.image || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              if (sectionKey === 'teamMembers') {
                                updated.teamMembers = { ...updated.teamMembers };
                                updated.teamMembers[key] = { ...updated.teamMembers[key], image: e.target.value };
                              } else {
                                updated.about = { ...updated.about };
                                updated.about.teamMembers = { ...updated.about.teamMembers };
                                updated.about.teamMembers[key] = { ...updated.about.teamMembers[key], image: e.target.value };
                              }
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Biography</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          maxRows={8}
                          variant="outlined"
                          value={member.biography || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              if (sectionKey === 'teamMembers') {
                                updated.teamMembers = { ...updated.teamMembers };
                                updated.teamMembers[key] = { ...updated.teamMembers[key], biography: e.target.value };
                              } else {
                                updated.about = { ...updated.about };
                                updated.about.teamMembers = { ...updated.about.teamMembers };
                                updated.about.teamMembers[key] = { ...updated.about.teamMembers[key], biography: e.target.value };
                              }
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Expertise</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={8}
                          variant="outlined"
                          value={Array.isArray(member.expertise) ? member.expertise.join("\n") : (member.expertise || '')}
                          onChange={e => {
                            const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                            setStateContent(prev => {
                              const updated = { ...prev };
                              if (sectionKey === 'teamMembers') {
                                updated.teamMembers = { ...updated.teamMembers };
                                updated.teamMembers[key] = { ...updated.teamMembers[key], expertise: newArr };
                              } else {
                                updated.about = { ...updated.about };
                                updated.about.teamMembers = { ...updated.about.teamMembers };
                                updated.about.teamMembers[key] = { ...updated.about.teamMembers[key], expertise: newArr };
                              }
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Position</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={8}
                          variant="outlined"
                          value={Array.isArray(member.position) ? member.position.join("\n") : (member.position || '')}
                          onChange={e => {
                            const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                            setStateContent(prev => {
                              const updated = { ...prev };
                              if (sectionKey === 'teamMembers') {
                                updated.teamMembers = { ...updated.teamMembers };
                                updated.teamMembers[key] = { ...updated.teamMembers[key], position: newArr };
                              } else {
                                updated.about = { ...updated.about };
                                updated.about.teamMembers = { ...updated.about.teamMembers };
                                updated.about.teamMembers[key] = { ...updated.about.teamMembers[key], position: newArr };
                              }
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                    </Box>
                  ))
                ) : sectionKey === 'servicesDetails' && typeof stateContent[sectionKey] === 'object' && !Array.isArray(stateContent[sectionKey]) ? (
                  Object.entries(stateContent[sectionKey]).map(([serviceKey, serviceValue]) => (
                    <Box key={serviceKey} mb={4} p={2} sx={{ background: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight={600} mb={2}>{serviceValue.title || serviceKey}</Typography>
                      {/* Title */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Title</Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={serviceValue.title || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated.servicesDetails = { ...updated.servicesDetails };
                              updated.servicesDetails[serviceKey] = { ...updated.servicesDetails[serviceKey], title: e.target.value };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      {/* Description */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Description</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={8}
                          variant="outlined"
                          value={serviceValue.description || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated.servicesDetails = { ...updated.servicesDetails };
                              updated.servicesDetails[serviceKey] = { ...updated.servicesDetails[serviceKey], description: e.target.value };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      {/* Details (array or object) */}
                      {serviceKey === 'laboratory' && serviceValue.details && typeof serviceValue.details === 'object' && !Array.isArray(serviceValue.details) ? (
                        Object.entries(serviceValue.details).map(([detailKey, detailArr]) => (
                          <Box mb={2} key={detailKey}>
                            <Typography variant="subtitle2" fontWeight={500} mb={0.5}>{detailKey}</Typography>
                            <TextField
                              fullWidth
                              multiline
                              minRows={Math.max(2, Array.isArray(detailArr) ? detailArr.length : 2)}
                              maxRows={12}
                              variant="outlined"
                              value={Array.isArray(detailArr) ? detailArr.join("\n") : (detailArr || '')}
                              onChange={e => {
                                const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                                setStateContent(prev => {
                                  const updated = { ...prev };
                                  updated.servicesDetails = { ...updated.servicesDetails };
                                  updated.servicesDetails[serviceKey] = { ...updated.servicesDetails[serviceKey] };
                                  updated.servicesDetails[serviceKey].details = { ...updated.servicesDetails[serviceKey].details };
                                  updated.servicesDetails[serviceKey].details[detailKey] = newArr;
                                  return updated;
                                });
                              }}
                              sx={{ background: '#fafbfc', borderRadius: 2 }}
                            />
                          </Box>
                        ))
                      ) : (
                        <Box mb={2}>
                          <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Details</Typography>
                          <TextField
                            fullWidth
                            multiline
                            minRows={Math.max(2, Array.isArray(serviceValue.details) ? serviceValue.details.length : 2)}
                            maxRows={12}
                            variant="outlined"
                            value={Array.isArray(serviceValue.details) ? serviceValue.details.join("\n") : (serviceValue.details || '')}
                            onChange={e => {
                              const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                              setStateContent(prev => {
                                const updated = { ...prev };
                                updated.servicesDetails = { ...updated.servicesDetails };
                                updated.servicesDetails[serviceKey] = { ...updated.servicesDetails[serviceKey], details: newArr };
                                return updated;
                              });
                            }}
                            sx={{ background: '#fafbfc', borderRadius: 2 }}
                          />
                        </Box>
                      )}
                      {/* Images (array) */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Images</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={Math.max(2, Array.isArray(serviceValue.images) ? serviceValue.images.length : 2)}
                          maxRows={12}
                          variant="outlined"
                          value={Array.isArray(serviceValue.images) ? serviceValue.images.join("\n") : (serviceValue.images || '')}
                          onChange={e => {
                            const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated.servicesDetails = { ...updated.servicesDetails };
                              updated.servicesDetails[serviceKey] = { ...updated.servicesDetails[serviceKey], images: newArr };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                    </Box>
                  ))
                ) : ['serviceDetails', 'survey', 'environment', 'geology', 'mining', 'laboratory'].includes(sectionKey) && typeof stateContent[sectionKey] === 'object' && !Array.isArray(stateContent[sectionKey]) ? (
                  Object.entries(stateContent[sectionKey]).map(([itemKey, itemValue]) => (
                    <Box key={itemKey} mb={4} p={2} sx={{ background: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight={600} mb={2}>{itemValue.title || itemKey}</Typography>
                      {/* Title */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Title</Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={itemValue.title || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated[sectionKey] = { ...updated[sectionKey] };
                              updated[sectionKey][itemKey] = { ...updated[sectionKey][itemKey], title: e.target.value };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      {/* Description */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Description</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={8}
                          variant="outlined"
                          value={itemValue.description || ''}
                          onChange={e => {
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated[sectionKey] = { ...updated[sectionKey] };
                              updated[sectionKey][itemKey] = { ...updated[sectionKey][itemKey], description: e.target.value };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      {/* Details (array) */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Details</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={Math.max(2, Array.isArray(itemValue.details) ? itemValue.details.length : 2)}
                          maxRows={12}
                          variant="outlined"
                          value={Array.isArray(itemValue.details) ? itemValue.details.join("\n") : (itemValue.details || '')}
                          onChange={e => {
                            const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated[sectionKey] = { ...updated[sectionKey] };
                              updated[sectionKey][itemKey] = { ...updated[sectionKey][itemKey], details: newArr };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                      {/* Images (array) */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>Images</Typography>
                        <TextField
                          fullWidth
                          multiline
                          minRows={Math.max(2, Array.isArray(itemValue.images) ? itemValue.images.length : 2)}
                          maxRows={12}
                          variant="outlined"
                          value={Array.isArray(itemValue.images) ? itemValue.images.join("\n") : (itemValue.images || '')}
                          onChange={e => {
                            const newArr = e.target.value.split("\n").filter(x => x.trim() !== "");
                            setStateContent(prev => {
                              const updated = { ...prev };
                              updated[sectionKey] = { ...updated[sectionKey] };
                              updated[sectionKey][itemKey] = { ...updated[sectionKey][itemKey], images: newArr };
                              return updated;
                            });
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      </Box>
                    </Box>
                  ))
                ) : (
                  Object.entries(stateContent[sectionKey]).map(([field, value]) => (
                    <Box key={field} mb={3}>
                      <Typography variant="subtitle1" fontWeight={500} mb={1}>{field}</Typography>
                      {Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' ? (
                        value.map((item, idx) => (
                          <Paper key={idx} sx={{ p: 2, mb: 1, background: '#f5f5f5', borderRadius: 2 }}>
                            {Object.entries(item).map(([k, v]) => (
                              <TextField
                                key={k}
                                label={k}
                                value={v}
                                onChange={e => handleChange(sectionKey, field, e.target.value, idx, k)}
                                sx={{ m: 1, minWidth: 180 }}
                                size="small"
                              />
                            ))}
                          </Paper>
                        ))
                      ) : (
                        <TextField
                          multiline
                          minRows={Array.isArray(value) ? Math.max(2, value.length) : 2}
                          maxRows={12}
                          fullWidth
                          variant="outlined"
                          value={Array.isArray(value) ? value.join("\n") : (typeof value === 'object' ? JSON.stringify(value, null, 2) : value)}
                          onChange={e => {
                            let newValue = e.target.value;
                            if (Array.isArray(value)) {
                              newValue = newValue.split("\n").filter(x => x.trim() !== "");
                            } else if (typeof value === 'object' && value !== null) {
                              try {
                                newValue = JSON.parse(newValue);
                              } catch {
                                // ignore parse error, keep as string
                              }
                            }
                            handleChange(sectionKey, field, newValue);
                          }}
                          sx={{ background: '#fafbfc', borderRadius: 2 }}
                        />
                      )}
                    </Box>
                  ))
                )}
              </AccordionDetails>
            </Accordion>
            <Divider sx={{ mb: 2 }} />
          </div>
        ))}
        <Box textAlign="center" mt={4}>
          <Button
            onClick={saveContent}
            disabled={saving}
            variant="contained"
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: 18, borderRadius: 3 }}
          >
            {saving ? <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} /> : null}
            {saving ? "Saving..." : content.admin.saveButton}
          </Button>
        </Box>
      </Paper>
    </Box>
    </div>
  );
};

export default AdminPage;

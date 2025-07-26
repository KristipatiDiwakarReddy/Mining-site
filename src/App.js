import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Accreditations from "./pages/Accreditations";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { setDefaultContent, defaultContent } from "./content";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./hooks/useAuth";
import ServiceDetail from './components/ServiceDetail';
import TeamMember from './pages/TeamMember';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <Navigate to="/login" />;
  return children;
};

function App() {

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "site_content", "content"));
      if (snap.exists()) {
        setDefaultContent(snap.data()); // sets the shared content
        setContent(snap.data());        // for rendering in this component
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(db, "site_content", "content");
  //     const snap = await getDoc(docRef);
  //     // if (snap.exists()) {
  //     //   setDefaultContent(snap.data());
  //     //   setContent(snap.data());
  //     //   setLoading(false);
  //     // } else {
  //       // Push local defaultContent to Firestore if not exists
  //       await setDoc(docRef, defaultContent);
  //       setDefaultContent(defaultContent);
  //       setContent(defaultContent);
  //       setLoading(false);
  //     //}
  //   };
  //   fetchData();
  // }, []);

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/accreditations" element={<Accreditations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={ <PrivateRoute> <Admin /> </PrivateRoute> } />
          <Route path="/login" element={<Login />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/team/:name" element={<TeamMember />} />
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Accreditations", path: "/accreditations" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <footer style={styles.footer}>
      <p style={styles.copyText}>
        &copy; {currentYear} Global Environment & Mining Services LLP. All rights reserved.
      </p>
      <div style={styles.linkContainer}>
        {links.map((link) => (
          <Link key={link.label} to={link.path} style={styles.link}>
            {link.label}
          </Link>
        ))}
      </div>
    
    </footer>
  );
};

const styles = {
  footer: {
    padding: "2rem 1rem",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  },
  linkContainer: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "space-evenly"
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
  },
  copyText: {
    fontSize: "0.9rem",
  },
};

export default Footer;

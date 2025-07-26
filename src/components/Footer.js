import React from "react";
import { Link } from "react-router-dom";
import { defaultContent as content } from "../content";

const Footer = () => {
  const links = (content.footer && content.footer.links) ? content.footer.links : [];

  return (
    <footer style={styles.footer}>
      <p style={styles.copyText}>
        {content.footer && content.footer.copyright}
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

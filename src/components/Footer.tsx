import React from "react";

type FooterStyles = {
  footer: React.CSSProperties;
};

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 My React App. All Rights Reserved.</p>
    </footer>
  );
};

const styles: FooterStyles = {
  footer: {
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "#f1f1f1",
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
};

export default Footer;

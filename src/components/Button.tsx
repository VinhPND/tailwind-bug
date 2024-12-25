import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
};

const styles: { button: React.CSSProperties } = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Button;

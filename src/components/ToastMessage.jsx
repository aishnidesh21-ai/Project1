import React, { useEffect, useState } from "react";

const ToastMessage = ({ message, trigger }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [message, trigger]);

  if (!show) return null;

  return (
    <div
      style={styles.toast}
      className="toast-message animate__animated animate__fadeInDown"
    >
      {message}
    </div>
  );
};

const styles = {
  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#222",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    zIndex: 9999,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
    maxWidth: "80%",
    textAlign: "center",
  },
};

export default ToastMessage;

import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { role, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = React.useState("");

  const handleLogout = () => {
    logout();
    setToast("✅ Logged out successfully");
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <>
      {toast && <ToastMessage message={toast} />}
      <Navbar
        expand="lg"
        sticky="top"
        style={{ backgroundColor: "#5a5252ff" }}
        variant="dark"
        >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold"style={{ fontSize: "2rem" }} 
          >
            🎓 Course Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {!token && (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </>
              )}

              {token && role && role.toLowerCase() === "student" && (
                <>
                  <Nav.Link as={Link} to="/studentdashboard">Student Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </>
              )}

              {token && role && role.toLowerCase() === "instructor" && (
                <>
                  <Nav.Link as={Link} to="/instructordashboard">Instructor Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </>
              )}

              {token && (
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="ms-3"
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

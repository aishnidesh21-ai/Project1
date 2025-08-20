import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "", 
    email: "",
    password: "",
    role: "student",
  });
  const [toast, setToast] = useState("");
  const [toastTrigger, setToastTrigger] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToast = (message) => {
    setToast(message);
    setToastTrigger((prev) => prev + 1);
  };

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, formData);
      handleToast("✅ " + res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Register failed:", err);
      const msg = err.response?.data?.message || "❌ Registration failed";
      handleToast(msg);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow border-0">
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">Register</h2>
                {toast && <ToastMessage message={toast} trigger={toastTrigger} />}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      placeholder="Enter 10-digit number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </Form.Select>
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Register;

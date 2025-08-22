import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import ToastMessage from "../components/ToastMessage";
import { AuthContext } from "../context/AuthContext";

import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(0);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "https://project1backend-x8lb.onrender.com/api";

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastTrigger((t) => t + 1);
  };

  const redirectByRole = (role) => {
    console.log("Redirecting by role:", role);
    if (role && typeof role === "string") {
      const lowerRole = role.toLowerCase();
      if (lowerRole === "instructor") {
        navigate("/instructordashboard");
      } else if (lowerRole === "student") {
        navigate("/studentdashboard");
      } else {
        navigate("/");
      }
    } else {
      console.error("Invalid role for redirection:", role);
      navigate("/");
    }
  };

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const data = response.data;
      console.log("Login response:", data);
      login(data);

      const userRole = data.role || (data.user && data.user.role);
      redirectByRole(userRole);
    } catch (error) {
      console.error("Login error:", error);
      showToast(error.response?.data?.message || "Login failed");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(`${apiUrl}/auth/google-login`, { idToken });
      const data = response.data;
      console.log("Google login response:", data);
      login(data);

      const userRole = data.role || (data.user && data.user.role);
      redirectByRole(userRole);
    } catch (error) {
      console.error("Google login error:", error);
      showToast("Google login failed");
    }
  };

  // Phone OTP
  const initRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendOtp = async () => {
    if (!phone) return showToast("Enter phone number with country code");
    try {
      initRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      showToast("OTP sent!");
    } catch (error) {
      console.error("OTP send error:", error);
      showToast("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp) return showToast("Enter OTP");
    try {
      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(`${apiUrl}/auth/phone-login`, { idToken });
      const data = response.data;
      console.log("Phone login response:", data);
      login(data);

      const userRole = data.role || (data.user && data.user.role);
      redirectByRole(userRole);
    } catch (error) {
      console.error("OTP verification error:", error);
      showToast("Invalid OTP");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow border-0">
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">Login</h2>

              {/* Email/Password Login */}
              <Form onSubmit={handleEmailLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Login
                </Button>
              </Form>

              <hr />

              {/* Google Login */}
              <Button variant="danger" className="w-100 mb-3" onClick={handleGoogleLogin}>
                Sign in with Google
              </Button>

              <hr />

              {/* Phone OTP Login */}
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91XXXXXXXXXX"
                  />
                </Form.Group>

                {otpSent && (
                  <Form.Group className="mb-3">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                  </Form.Group>
                )}

                <div id="recaptcha-container"></div>

                {!otpSent ? (
                  <Button variant="secondary" className="w-100 mb-2" onClick={sendOtp}>
                    Send OTP
                  </Button>
                ) : (
                  <Button variant="success" className="w-100" onClick={verifyOtp}>
                    Verify OTP & Login
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastMessage message={toastMessage} trigger={toastTrigger} />
    </Container>
  );
};

export default Login;

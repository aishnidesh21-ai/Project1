import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaGem,
} from "react-icons/fa";


function Footer() {
  return (
    <footer className="footer bg-light text-muted pt-4">
      <section className="d-flex justify-content-center justify-content-lg-between border-bottom px-4 pb-3">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="https://www.facebook.com" className="me-4 text-reset">
            <FaFacebookF />
          </a>
          <a href="https://x.com/?lang=en-in" className="me-4 text-reset">
            <FaTwitter />
          </a>
          <a href="https://www.google.com" className="me-4 text-reset">
            <FaGoogle />
          </a>
          <a href="https://www.instagram.com" className="me-4 text-reset">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/login" className="me-4 text-reset">
            <FaLinkedin />
          </a>
          <a href="https://github.com/login" className="me-4 text-reset">
            <FaGithub />
          </a>
        </div>
      </section>

      <Container className="text-center text-md-start mt-5"style={{ backgroundColor: "#373333ff", color: "#dfd9d9ff" }}>
        <Row className="mt-3">
          <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <FaGem className="me-2" /> Course Management
            </h6>
            <p>
              Our platform offers seamless course and student management for instructors and students alike.
            </p>
          </Col>

          <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
            <p><a href="#" className="text-reset">React</a></p>
            <p><a href="#" className="text-reset">Express</a></p>
            <p><a href="#" className="text-reset">MongoDB</a></p>
            <p><a href="#" className="text-reset">Bootstrap</a></p>
          </Col>

          <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
            <p><a href="#" className="text-reset">Java</a></p>
            <p><a href="#" className="text-reset">SpringBoot</a></p>
            <p><a href="#" className="text-reset">MySQL</a></p>
            <p><a href="#" className="text-reset">HTML-CSS</a></p>
          </Col>

          <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p><FaHome className="me-2" /> Pune, MH 411001, India</p>
            <p><FaEnvelope className="me-2" /> support@cms.com</p>
            <p><FaPhone className="me-2" /> +91 98765 43210</p>
            <p><FaPrint className="me-2" /> +91 01234 56789</p>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-4 copyright-bar"style={{ backgroundColor: "#242323ff", color: "#dcc6c6ff" }}>
        &copy; {new Date().getFullYear()} Course Management System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

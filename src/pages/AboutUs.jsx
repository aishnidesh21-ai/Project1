import React from "react";
import { Card, Container } from "react-bootstrap";

function AboutUs() {
  return (
    <Container className="d-flex justify-content-center align-items-center page-container">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "800px" }}>
        <h2 className="text-center text-primary mb-4">About Us</h2>
        <p className="text-muted">
          Welcome to the Course Management System. Our platform is designed to help students enroll in courses and instructors manage them with ease.
          We aim to simplify the educational process with clean, fast, and modern technology.
          
          <Card className="p-4 shadow-sm">
          <h4>✨ Why Choose Us?</h4>
      <ul>
          <li>Simple and fast enrollment process</li>
          <li>Role-based access for better security</li>
          <li>Real-time updates for courses and students</li>
          <li>Clean and modern UI using React & Bootstrap</li>
          <li>Reliable backend with Express and MongoDB</li>
        </ul>
    <p>
      We are continuously improving the platform to meet the evolving needs of students and educators.
    </p>
</Card>

        </p>
      </Card>
    </Container>
  );
}

export default AboutUs;

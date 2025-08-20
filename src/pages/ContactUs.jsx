import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

function ContactUs() {
  return (
    <div className="page-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4 shadow">
              <h2 className="text-center mb-4 text-info">Contact Us</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your message..." />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Send</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
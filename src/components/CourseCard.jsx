import React from "react";
import { Card, Button } from "react-bootstrap";

function CourseCard({ course, isInstructor, onDelete, onEnroll }) {
  return (
    <Card className="mb-3 shadow">
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Instructor: {course.instructor}</Card.Subtitle>
        {isInstructor ? (
          <Button variant="danger" onClick={() => onDelete(course._id)}>Delete</Button>
        ) : (
          <Button variant="primary" onClick={() => onEnroll(course._id)}>Enroll</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
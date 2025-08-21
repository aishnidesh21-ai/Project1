import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ToastMessage from "../components/ToastMessage";
import { AuthContext } from "../context/AuthContext";

function StudentDashboard() {
  const { token, name: studentName, email } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [toast, setToast] = useState("");
  const [toastTrigger, setToastTrigger] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL || "https://project1backend-x8lb.onrender.com/api";

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log('Fetching courses with token:', token);
        const res = await axios.get(`${apiUrl}/courses`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Courses data received:', res.data);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setToast("❌ Failed to load courses");
        setToastTrigger(Date.now());
      }
    };
    
    if (token) {
      fetch();
    } else {
      console.log('No token available, cannot fetch courses');
    }
  }, [token, apiUrl]);

  const handleEnroll = async (courseId) => {
    if (!token) {
      setToast("⚠️ Login required to enroll");
      setToastTrigger(Date.now());
      return;
    }

    if (!studentName || !email) {
      setToast("⚠️ Student information missing");
      setToastTrigger(Date.now());
      return;
    }

    try {
      console.log('Enrolling in course:', courseId);
      const response = await axios.post(`${apiUrl}/courses/${courseId}/enroll`, {
        studentName,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Enrollment response:', response.data);
      setToast("✅ Enrolled successfully!");
      
      // Refresh courses list after enrollment
      const coursesRes = await axios.get(`${apiUrl}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Enrollment error:', error);
      setToast("❌ Already enrolled or error occurred");
    } finally {
      setToastTrigger(Date.now());
    }
  };

  return (
    <Container className="mt-4">
        <h2 className="mb-4">Student Dashboard</h2>
        {toast && <ToastMessage message={toast} trigger={toastTrigger} />}
        <Row>
          {courses.map((course) => (
            <Col md={4} key={course._id} className="mb-3">
              <Card className="h-100 shadow">
                {course.logo && (
                  <Card.Img
                    variant="top"
                    src={course.logo}
                    alt={`${course.title} Logo`}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Button onClick={() => handleEnroll(course._id)}>Enroll</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
  );
}

export default StudentDashboard;

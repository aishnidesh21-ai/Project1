import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col, Table, Modal } from "react-bootstrap";
import ToastMessage from "../components/ToastMessage";
import { AuthContext } from "../context/AuthContext";

function InstructorDashboard() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    instructor: "",
    logo: "",
  });
  const [toast, setToast] = useState("");
  const [toastTrigger, setToastTrigger] = useState(0);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState({
    courseId: "",
    studentId: "",
    studentName: "",
    email: "",
  });

  // Config for axios with auth header
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${apiUrl}/courses`, axiosConfig);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
      setToast("❌ Failed to fetch courses");
      setToastTrigger(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/courses`, courseData, axiosConfig);
      setToast("✅ Course added");
      setToastTrigger(prev => prev + 1);
      setCourseData({ title: "", description: "", instructor: "", logo: "" });
      fetchCourses();
    } catch (err) {
      console.error(err);
      setToast("❌ Failed to add course");
      setToastTrigger(prev => prev + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/courses/${id}`, axiosConfig);
      setToast("🗑️ Course deleted");
      setToastTrigger(prev => prev + 1);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setToast("❌ Failed to delete course");
      setToastTrigger(prev => prev + 1);
    }
  };

  const handleRemoveStudent = async (studentId, courseId) => {
    try {
      await axios.delete(
        `${apiUrl}/courses/${courseId}/students/${studentId}`,
        axiosConfig
      );
      setToast("✅ Student removed");
      setToastTrigger(prev => prev + 1);
      fetchCourses();
    } catch (error) {
      console.error("Error removing student", error);
      setToast("❌ Failed to remove student");
      setToastTrigger(prev => prev + 1);
    }
  };

  const openCourseEditModal = (course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const handleCourseUpdate = async () => {
    try {
      const { _id, title, description, instructor, logo } = editingCourse;
      await axios.put(`${apiUrl}/courses/${_id}`, {
        title,
        description,
        instructor,
        logo,
      }, axiosConfig);
      setToast("✏️ Course updated");
      setToastTrigger(prev => prev + 1);
      setShowCourseModal(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setToast("❌ Failed to update course");
      setToastTrigger(prev => prev + 1);
    }
  };

  const openStudentEditModal = (student, courseId) => {
    setEditingStudent({ ...student, courseId });
    setShowStudentModal(true);
  };

  const handleStudentUpdate = async () => {
    const { courseId, studentId, studentName, email } = editingStudent;
    try {
      await axios.put(
        `${apiUrl}/courses/${courseId}/students/${studentId}`,
        { studentName, email },
        axiosConfig
      );
      setToast("✏️ Student updated");
      setToastTrigger(prev => prev + 1);
      setShowStudentModal(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setToast("❌ Failed to update student");
      setToastTrigger(prev => prev + 1);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Instructor Dashboard</h2>
      {toast && <ToastMessage message={toast} trigger={toastTrigger} />}

      {/* Add Course */}
      <Card className="p-4 mb-4 shadow">
        <Form onSubmit={handleAdd}>
          <Form.Group className="mb-2">
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              value={courseData.title}
              onChange={(e) =>
                setCourseData({ ...courseData, title: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={courseData.description}
              onChange={(e) =>
                setCourseData({ ...courseData, description: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Instructor</Form.Label>
            <Form.Control
              value={courseData.instructor}
              onChange={(e) =>
                setCourseData({ ...courseData, instructor: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              value={courseData.logo}
              onChange={(e) =>
                setCourseData({ ...courseData, logo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button type="submit">Add Course</Button>
        </Form>
      </Card>

      {/* All Courses */}
      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                {course.logo && (
                  <img
                    src={course.logo}
                    alt="Logo"
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    className="mb-3"
                  />
                )}
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Text>
                  <strong>Instructor:</strong> {course.instructor}
                </Card.Text>
                <Button
                  variant="danger"
                  className="me-2"
                  size="sm"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openCourseEditModal(course)}
                >
                  Edit
                </Button>

                {/* Enrolled Students */}
                {course.students?.length > 0 && (
                  <>
                    <hr />
                    <h6>Enrolled Students:</h6>
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.students.map((student) => (
                          <tr key={student.studentId}>
                            <td>{student.studentName}</td>
                            <td>{student.email}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                className="me-2"
                                onClick={() =>
                                  handleRemoveStudent(
                                    student.studentId,
                                    course._id
                                  )
                                }
                              >
                                Remove
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                  openStudentEditModal(student, course._id)
                                }
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal: Edit Course */}
      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCourse && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Instructor</Form.Label>
                <Form.Control
                  value={editingCourse.instructor}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      instructor: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  value={editingCourse.logo}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      logo: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCourseUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal: Edit Student */}
      <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={editingStudent.studentName}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    studentName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={editingStudent.email}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleStudentUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InstructorDashboard;

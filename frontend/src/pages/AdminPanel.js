import React, { useState, useEffect } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", duration: "", image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => Swal.fire("Error", "Failed to load courses", "error"));
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.description || !form.duration) {
        Swal.fire("Error", "All fields are required", "error");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("duration", form.duration);
      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await API.put(`/courses/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Success", "Course updated successfully", "success");
      } else {
        await API.post("/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Success", "Course added successfully", "success");
      }

      setForm({ title: "", description: "", duration: "", image: null });
      setEditingId(null);
      loadCourses();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      image: null, // New image can be uploaded if needed
    });
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the course permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/courses/${id}`);
          Swal.fire("Deleted", "Course deleted successfully", "success");
          loadCourses();
        } catch (err) {
          Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <h3>Admin Panel - Manage Courses</h3>

      {/* Add/Edit Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>{editingId ? "Edit Course" : "Add Course"}</h5>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Duration (e.g. 3 months)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editingId ? "Update Course" : "Add Course"}
          </button>
          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              onClick={() => {
                setForm({ title: "", description: "", duration: "", image: null });
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Courses List */}
      <div className="row">
        {courses.map((course) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={course.id}>
            <div className="card mb-3 shadow-sm">
              {course.image && (
                <img
                  src={`http://localhost:5000${course.image}`}
                  className="card-img-top img-fluid"
                  alt={course.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5>{course.title}</h5>
                <p>{course.description}</p>
                <p><b>Duration:</b> {course.duration}</p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

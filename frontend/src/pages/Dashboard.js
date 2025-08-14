import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/courses", {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((res) => setCourses(res.data))
      .catch(() => Swal.fire("Error", "Failed to load courses", "error"));
  }, [user.token]);

const enroll = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await API.post(`/enroll/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    Swal.fire("Success", "Enrolled successfully", "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Enrollment X", "error");
  }
};




  return (
    <div className="container mt-4">
      <h3 className="mb-4">Student Dashboard</h3>
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={course.id}>
              <div className="card mb-4 shadow-sm">
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    className="card-img-top img-fluid"
                    alt={course.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body text-center">
                  <h5 className="card-title">{course.title}</h5>
                  <button
                    className="btn btn-success btn-sm w-100 mt-2"
                    onClick={() => enroll(course.id)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import API from "../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Available Courses</h3>
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-4 col-sm-6 col-12" key={course.id}>
              <div className="card mb-3 shadow-sm">
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    className="card-img-top img-fluid"
                    alt={course.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>
                    <b>Duration:</b> {course.duration}
                  </p>
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

export default Courses;

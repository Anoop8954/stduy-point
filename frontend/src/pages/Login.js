import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let endpoint = "/auth/login";
      if (email === "admin@example.com") endpoint = "/auth/admin/login";

      const { data } = await API.post(endpoint, { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      login(data.token, data.role);
      Swal.fire("Success", "Login successful", "success");
      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            <input
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

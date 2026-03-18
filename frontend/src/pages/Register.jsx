import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    storeName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register(formData);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Seller Registration
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Gender */}
        <select
          name="gender"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Store Name */}
        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          required
          className="w-full mb-6 p-2 border rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <a href="/login" className="text-green-600 font-medium ml-1">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/login', values);
        const { accessToken, refreshToken, accessTokenExpiryIn } = response.data;

        const expiryTime = new Date().getTime() + (accessTokenExpiryIn * 1000);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessTokenExpiry', expiryTime);

        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    },
  });

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <form onSubmit={formik.handleSubmit} className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Log In to Melodyverse</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
            className={`p-4 border-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-indigo-500'} bg-transparent text-white placeholder-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="relative mb-4">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            className={`p-4 border-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-indigo-500'} bg-transparent text-white placeholder-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
          />
          <button
            type="button"
            onClick={handlePasswordVisibilityToggle}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
          >
            {passwordVisible ? <FaEyeSlash className="w-6 h-6" /> : <FaEye className="w-6 h-6" />}
          </button>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="rememberMe"
              className="mr-2"
            />
            Remember Me
          </label>
          <Link to="/forgot-password" className="text-purple-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold p-4 rounded-lg w-full hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
        >
          Login
        </button>
        <p className="mt-6 text-center text-white">
          Don't have an account? <Link to="/signup" className="text-purple-400 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

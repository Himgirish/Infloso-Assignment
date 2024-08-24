import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/signup', {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        toast.success('Signup successful! Redirecting to login...');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        toast.error(`Signup failed: ${error.response?.data?.error || 'An error occurred'}`);
      }
    },
  });

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibilityToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <form onSubmit={formik.handleSubmit} className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Join Melodyverse</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="Username"
            className={`p-4 border-2 ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-indigo-500'} bg-transparent text-white placeholder-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.username}</div>
          ) : null}
        </div>
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
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-2">{formik.errors.password}</div>
        ) : null}
        <div className="relative mb-4">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
            className={`p-4 border-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-indigo-500'} bg-transparent text-white placeholder-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
          />
          <button
            type="button"
            onClick={handleConfirmPasswordVisibilityToggle}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
          >
            {confirmPasswordVisible ? <FaEyeSlash className="w-6 h-6" /> : <FaEye className="w-6 h-6" />}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm mt-2">{formik.errors.confirmPassword}</div>
        ) : null}
        <div className="mb-4">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="terms"
              required
              className="mr-2"
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold p-4 rounded-lg w-full hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
        >
          Sign Up
        </button>
        <p className="mt-6 text-center text-white">
          Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

'use client';

import { useEffect, useState } from 'react';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);

  const correctPassword = 'infonet123'; // Change this to your own secure password

  useEffect(() => {
    if (isLoggedIn) {
      const storedData = localStorage.getItem('contactSubmissions');
      setSubmissions(storedData ? JSON.parse(storedData) : []);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (passwordInput === correctPassword) {
      setIsLoggedIn(true);
    } else {
      alert('❌ Incorrect password!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">🔐 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full p-2 border rounded mb-4"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📥 Contact Form Submissions</h1>
      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md border border-gray-200">
              <p><strong>Full Name:</strong> {item.fullName}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Service:</strong> {item.service}</p>
              <p><strong>Message:</strong> {item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;

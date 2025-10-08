// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/admin/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;

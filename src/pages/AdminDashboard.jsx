import React, { useState, useEffect } from 'react';

// ✅ Get backend base URL from .env (Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return res.json();
};

const AdminDashboard = () => {
  const [view, setView] = useState('contact');
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // You can fetch the logged-in admin info here if needed
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      window.location.href = '/admin/login';
    } else {
      setAdmin({ name: 'Admin' }); // Static placeholder; can fetch actual data
    }
  }, []);

  const renderView = () => {
    switch (view) {
      case 'contact':
        return <AdminContactSubmissions />;
      case 'new-member':
        return <AdminNewMemberSubmissions />;
      case 'workforce':
        return <AdminWorkforceSubmissions />;
      default:
        return <AdminContactSubmissions />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 font-bold text-2xl border-b border-blue-500">Admin Panel</div>
        <nav className="flex-grow p-4 space-y-2">
          <button onClick={() => setView('contact')} className={`block w-full text-left p-2 rounded ${view === 'contact' ? 'bg-blue-900' : 'hover:bg-blue-800'}`}>Contact Submissions</button>
          <button onClick={() => setView('new-member')} className={`block w-full text-left p-2 rounded ${view === 'new-member' ? 'bg-blue-900' : 'hover:bg-blue-800'}`}>New Members</button>
          <button onClick={() => setView('workforce')} className={`block w-full text-left p-2 rounded ${view === 'workforce' ? 'bg-blue-900' : 'hover:bg-blue-800'}`}>Workforce</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {admin?.name}</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/admin/login';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {renderView()}
      </main>
    </div>
  );
};

// Contact Submissions
const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await apiFetch(`${API_BASE_URL}/api/submissions/admin/contact`);
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching contact submissions:', err);
      }
    };
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedData = await apiFetch(`${API_BASE_URL}/api/submissions/admin/contact/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      alert(`Status updated to ${newStatus} for ${updatedData.submission.name}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contact Submissions</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Message</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{sub.name}</td>
              <td className="p-2">{sub.message}</td>
              <td className="p-2">{sub.status}</td>
              <td className="p-2">
                <select
                  onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="">Change Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// New Member Submissions
const AdminNewMemberSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await apiFetch(`${API_BASE_URL}/api/submissions/admin/new-member`);
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching new member submissions:', err);
      }
    };
    fetchSubmissions();
  }, []);

  // ✅ Added missing function
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedData = await apiFetch(`${API_BASE_URL}/api/submissions/admin/new-member/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      alert(`Status updated to ${newStatus} for ${updatedData.submission.name}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">New Member Submissions</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{sub.name}</td>
              <td className="p-2">{sub.phone}</td>
              <td className="p-2">{sub.status}</td>
              <td className="p-2">
                <select
                  onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="">Change Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Workforce Submissions
const AdminWorkforceSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await apiFetch(`${API_BASE_URL}/api/submissions/admin/workforce`);
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching workforce submissions:', err);
      }
    };
    fetchSubmissions();
  }, []);

  // ✅ Added missing function
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedData = await apiFetch(`${API_BASE_URL}/api/submissions/admin/workforce/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      alert(`Status updated to ${newStatus} for ${updatedData.submission.name}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Workforce Submissions</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{sub.name}</td>
              <td className="p-2">{sub.department}</td>
              <td className="p-2">{sub.status}</td>
              <td className="p-2">
                <select
                  onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="">Change Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="assigned">Assigned</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

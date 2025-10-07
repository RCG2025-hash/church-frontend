import React, { useState, useEffect, createContext, useContext } from 'react';
import { LogIn, LogOut, Users, User, Mail, Church, Shield, CircleHelp, Briefcase, UserPlus, Edit, Trash2, X, Save, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

// --- Context for Authentication State ---
const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

// --- Utility function for API calls ---
async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('token');
      throw new Error('Authentication failed or token expired. Please log in again.');
    }
    throw new Error(data.message || 'An API error occurred.');
  }
  return data;
}

// --- Reusable UI Components ---

const Card = ({ children, className }) => (
  <div className={twMerge("bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300", className)}>
    {children}
  </div>
);

const Button = ({ children, className, onClick, disabled }) => (
  <button
    className={twMerge(
      "px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300",
      "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const InputField = ({ label, type = 'text', id, value, onChange, placeholder, name, required = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name || id} // Use name prop if provided, else fall back to id
      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const SelectField = ({ label, id, name, value, onChange, options, required = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <select
      id={id}
      name={name || id}
      value={value}
      onChange={onChange}
      required={required}
      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, id, name, checked, onChange }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={id}
      name={name || id}
      checked={checked}
      onChange={onChange}
      className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="text-gray-700 text-sm font-bold">
      {label}
    </label>
  </div>
);

const TextAreaField = ({ label, id, name, value, onChange, placeholder, rows = 3, required = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={name || id}
      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
    ></textarea>
  </div>
);

const Message = ({ type, children }) => {
  const baseClasses = "p-3 rounded-lg font-medium mb-4";
  const typeClasses = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };
  return <div className={twMerge(baseClasses, typeClasses[type])}>{children}</div>;
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6 relative">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        {/* MODIFIED: Added overflow-y-auto and max-h-[80vh] for scrolling, and pr-4 for padding */}
        <div className="modal-content overflow-y-auto max-h-[80vh] pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};


// --- Login Component ---
const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const data = await apiFetch(`${API_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem('token', data.token);
      setMessage(<Message type="success">Login successful! Redirecting...</Message>);
      setTimeout(() => login(), 1000);
    } catch (error) {
      setMessage(<Message type="error">Login failed: {error.message}</Message>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <Shield className="text-indigo-600" size={32} /> Admin Login
        </h2>
        {message}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'} <LogIn size={20} className="inline-block ml-2" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

// --- Admin Submission Components (with Edit/Delete) ---

const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch('http://localhost:5000/api/submissions/admin/contact');
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleEditClick = (item) => {
    setCurrentEditItem({ ...item }); // Create a copy to edit
    setIsEditModalOpen(true);
    setEditMessage('');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await apiFetch(`http://localhost:5000/api/submissions/admin/contact/${id}`, {
          method: 'DELETE',
        });
        setSubmissions(submissions.filter(sub => sub._id !== id));
        alert('Submission deleted successfully!'); // Use custom modal for production
      } catch (err) {
        console.error('Error deleting submission:', err);
        alert(`Failed to delete submission: ${err.message}`); // Use custom modal for production
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setEditMessage('Updating...');
    try {
      const updatedData = await apiFetch(`http://localhost:5000/api/submissions/admin/contact/${currentEditItem._id}`, {
        method: 'PUT',
        body: JSON.stringify(currentEditItem),
      });
      // Update the item in the local state
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      setEditMessage(<Message type="success">Updated successfully!</Message>);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setEditMessage('');
      }, 1500);
    } catch (err) {
      setEditMessage(<Message type="error">Failed to update: {err.message}</Message>);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedData = await apiFetch(`http://localhost:5000/api/submissions/admin/contact/${id}/status`, {
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


  if (loading) return <Message type="info">Loading contact submissions...</Message>;
  if (error) return <Message type="error">Error: {error}</Message>;

  return (
    <div className="overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Mail className="text-blue-500" size={20} /> All Contact Messages
      </h3>
      {submissions.length === 0 ? (
        <Message type="info">No contact submissions yet.</Message>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-200">Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Email</th>
              {/* <th className="py-3 px-6 text-left border-b border-gray-200">Subject</th> */}
              <th className="py-3 px-6 text-left border-b border-gray-200">Message</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Received On</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Status</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{sub.name}</td>
                <td className="py-3 px-6 text-left">{sub.email}</td>
                {/* <td className="py-3 px-6 text-left">{sub.subject || 'N/A'}</td> */}
                <td className="py-3 px-6 text-left">{sub.message}</td>
                <td className="py-3 px-6 text-left">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                    <SelectField
                        id={`status-${sub._id}`}
                        name="status"
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'replied', label: 'Replied' },
                            { value: 'closed', label: 'Closed' }
                        ]}
                        className="w-auto"
                    />
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600 p-2" onClick={() => handleEditClick(sub)}>
                      <Edit size={16} />
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 p-2" onClick={() => handleDeleteClick(sub._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Contact Submission">
        {currentEditItem && (
          <form onSubmit={handleUpdateSubmit}>
            {editMessage}
            <InputField label="Name" id="editName" name="name" value={currentEditItem.name} onChange={handleEditChange} required />
            <InputField label="Email" id="editEmail" name="email" value={currentEditItem.email} onChange={handleEditChange} type="email" required />
            <InputField label="Subject" id="editSubject" name="subject" value={currentEditItem.subject} onChange={handleEditChange} />
            <TextAreaField label="Message" id="editMessage" name="message" value={currentEditItem.message} onChange={handleEditChange} required rows={4} />
            <SelectField
                label="Status"
                id="editStatus"
                name="status"
                value={currentEditItem.status}
                onChange={handleEditChange}
                options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'replied', label: 'Replied' },
                    { value: 'closed', label: 'Closed' }
                ]}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} className="inline-block mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                <Save size={20} className="inline-block mr-1" /> Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

const AdminNewMemberSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch('http://localhost:5000/api/submissions/admin/new-member');
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleEditClick = (item) => {
    setCurrentEditItem({ ...item });
    setIsEditModalOpen(true);
    setEditMessage('');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this new member submission?')) {
      try {
        await apiFetch(`http://localhost:5000/api/submissions/admin/new-member/${id}`, {
          method: 'DELETE',
        });
        setSubmissions(submissions.filter(sub => sub._id !== id));
        alert('Submission deleted successfully!');
      } catch (err) {
        console.error('Error deleting submission:', err);
        alert(`Failed to delete submission: ${err.message}`);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentEditItem(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setEditMessage('Updating...');
    try {
      const updatedData = await apiFetch(`http://localhost:5000/api/submissions/admin/new-member/${currentEditItem._id}`, {
        method: 'PUT',
        body: JSON.stringify(currentEditItem),
      });
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      setEditMessage(<Message type="success">Updated successfully!</Message>);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setEditMessage('');
      }, 1500);
    } catch (err) {
      setEditMessage(<Message type="error">Failed to update: {err.message}</Message>);
    }
  };

  if (loading) return <Message type="info">Loading new member submissions...</Message>;
  if (error) return <Message type="error">Error: {error}</Message>;

  return (
    <div className="overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <UserPlus className="text-green-500" size={20} /> All New Member Submissions
      </h3>
      {submissions.length === 0 ? (
        <Message type="info">No new member submissions yet.</Message>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-200">Full Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Phone</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Address</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Gender</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Heard From</th>
              {/* <th className="py-3 px-6 text-left border-b border-gray-200">Small Group?</th> */}
              <th className="py-3 px-6 text-left border-b border-gray-200">Journey Stage</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Prayer Request</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Received On</th>
               <th className="py-3 px-6 text-left border-b border-gray-200">Status</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{sub.name}</td>
                <td className="py-3 px-6 text-left">{sub.email}</td>
                <td className="py-3 px-6 text-left">{sub.phoneNumber || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{sub.address || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{sub.gender || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{sub.howDidYouHear || 'N/A'}</td>
                {/* <td className="py-3 px-6 text-left">{sub.joinSmallGroup ? 'Yes' : 'No'}</td> */}
                <td className="py-3 px-6 text-left">{sub.spiritualJourneyStage || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{sub.prayerRequest || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                    <SelectField
                        id={`status-${sub._id}`}
                        name="status"
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'replied', label: 'Replied' },
                            { value: 'closed', label: 'Closed' }
                        ]}
                        className="w-auto"
                    />
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600 p-2" onClick={() => handleEditClick(sub)}>
                      <Edit size={16} />
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 p-2" onClick={() => handleDeleteClick(sub._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit New Member Submission">
        {currentEditItem && (
          <form onSubmit={handleUpdateSubmit}>
            {editMessage}
            <InputField label="Full Name" id="editFullName" name="name" value={currentEditItem.name} onChange={handleEditChange} required />
            <InputField label="Email" id="editEmail" name="email" value={currentEditItem.email} onChange={handleEditChange} type="email" required />
            <InputField label="Phone Number" id="editPhoneNumber" name="phoneNumber" value={currentEditItem.phoneNumber} onChange={handleEditChange} type="tel" />
            <InputField label="Address" id="editAddress" name="address" value={currentEditItem.address} onChange={handleEditChange} />
            <SelectField
                label="Gender"
                id="editGender"
                name="gender"
                value={currentEditItem.gender}
                onChange={handleEditChange}
                options={[
                    { value: '', label: '-- Select --' },
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Prefer not to say', label: 'Prefer not to say' },
                ]}
            required />
            <InputField label="How Did You Hear" id="editHowDidYouHear" name="howDidYouHear" value={currentEditItem.howDidYouHear} onChange={handleEditChange} />
            {/* <CheckboxField label="Join Small Group?" id="editJoinSmallGroup" name="joinSmallGroup" checked={currentEditItem.joinSmallGroup} onChange={handleEditChange} /> */}
            <SelectField
                label="Spiritual Journey Stage"
                id="editSpiritualJourneyStage"
                name="spiritualJourneyStage"
                value={currentEditItem.spiritualJourneyStage}
                onChange={handleEditChange}
                options={[
                    { value: '', label: '-- Select --' },
                    { value: 'Exploring Faith', label: 'Exploring Faith' },
                    { value: 'New Believer', label: 'New Believer' },
                    { value: 'Growing Christian', label: 'Growing Christian' },
                    { value: 'Mature Christian', label: 'Mature Christian' },
                    { value: 'Prefer Not To Say', label: 'Prefer Not To Say' }
                ]}
            />
            <TextAreaField label="Prayer Request" id="editPrayerRequest" name="prayerRequest" value={currentEditItem.prayerRequest} onChange={handleEditChange} rows={4} />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} className="inline-block mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                <Save size={20} className="inline-block mr-1" /> Save Changes
              </Button>
              
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

const AdminWorkforceSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch('http://localhost:5000/api/submissions/admin/workforce');
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleEditClick = (item) => {
    setCurrentEditItem({ ...item });
    setIsEditModalOpen(true);
    setEditMessage('');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this workforce application?')) {
      try {
        await apiFetch(`http://localhost:5000/api/submissions/admin/workforce/${id}`, {
          method: 'DELETE',
        });
        setSubmissions(submissions.filter(sub => sub._id !== id));
        alert('Submission deleted successfully!');
      } catch (err) {
        console.error('Error deleting submission:', err);
        alert(`Failed to delete submission: ${err.message}`);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setEditMessage('Updating...');
    try {
      const updatedData = await apiFetch(`http://localhost:5000/api/submissions/admin/workforce/${currentEditItem._id}`, {
        method: 'PUT',
        body: JSON.stringify(currentEditItem),
      });
      setSubmissions(submissions.map(sub =>
        sub._id === updatedData.submission._id ? updatedData.submission : sub
      ));
      setEditMessage(<Message type="success">Updated successfully!</Message>);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setEditMessage('');
      }, 1500);
    } catch (err) {
      setEditMessage(<Message type="error">Failed to update: {err.message}</Message>);
    }
  };

  if (loading) return <Message type="info">Loading workforce submissions...</Message>;
  if (error) return <Message type="error">Error: {error}</Message>;

  return (
    <div className="overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Briefcase className="text-purple-500" size={20} /> All Workforce Applications
      </h3>
      {submissions.length === 0 ? (
        <Message type="info">No workforce applications yet.</Message>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-200">Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Phone</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Department</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Message</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Submitted On</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Status</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{sub.name}</td>
                <td className="py-3 px-6 text-left">{sub.email}</td>
                <td className="py-3 px-6 text-left">{sub.phoneNumber || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{sub.department}</td>
                <td className="py-3 px-6 text-left">{sub.message || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                    <SelectField
                        id={`status-${sub._id}`}
                        name="status"
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'replied', label: 'Replied' },
                            { value: 'closed', label: 'Closed' }
                        ]}
                        className="w-auto"
                    />
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600 p-2" onClick={() => handleEditClick(sub)}>
                      <Edit size={16} />
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 p-2" onClick={() => handleDeleteClick(sub._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Workforce Application">
        {currentEditItem && (
          <form onSubmit={handleUpdateSubmit}>
            {editMessage}
            <InputField label="Name" id="editName" name="name" value={currentEditItem.name} onChange={handleEditChange} required />
            <InputField label="Email" id="editEmail" name="email" value={currentEditItem.email} onChange={handleEditChange} type="email" required />
            <InputField label="Phone Number" id="editPhoneNumber" name="phoneNumber" value={currentEditItem.phoneNumber} onChange={handleEditChange} type="tel" />
            <SelectField
                label="Department"
                id="editDepartment"
                name="department"
                value={currentEditItem.department}
                onChange={handleEditChange}
                options={[
                    { value: 'Ushers', label: 'Ushers' },
                    { value: 'Choir', label: 'Choir' },
                    { value: 'Media', label: 'Media' },
                    { value: 'ChildrensMinistry', label: "Children's Department" }
                ]}
                required
            />
            <TextAreaField label="Message" id="editMessage" name="message" value={currentEditItem.message} onChange={handleEditChange} rows={4} />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} className="inline-block mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                <Save size={20} className="inline-block mr-1" /> Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};


// --- Admin Dashboard Component ---
const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('contact'); // Default active tab

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3 mb-4 sm:mb-0">
            <Church className="text-indigo-600" size={40} /> Church Admin
          </h1>
          <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
            Logout <LogOut size={20} className="inline-block ml-2" />
          </Button>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveTab('contact')}
            className={twMerge("px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2",
              activeTab === 'contact' ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
          >
            <Mail size={20} /> Contact Messages
          </button>
          <button
            onClick={() => setActiveTab('newMembers')}
            className={twMerge("px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2",
              activeTab === 'newMembers' ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
          >
            <UserPlus size={20} /> New Members
          </button>
          <button
            onClick={() => setActiveTab('workforce')}
            className={twMerge("px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2",
              activeTab === 'workforce' ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
          >
            <Briefcase size={20} /> Workforce Applications
          </button>
        </nav>

        {/* Dashboard Content Area */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'contact' && <AdminContactSubmissions />}
          {activeTab === 'newMembers' && <AdminNewMemberSubmissions />}
          {activeTab === 'workforce' && <AdminWorkforceSubmissions />}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isAuthenticated ? <AdminDashboard /> : <Login />}
    </AuthContext.Provider>
  );
}

export default AdminLogin;

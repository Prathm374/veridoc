import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateUser } from '../utils/api';
import { colors } from '../styles/colors';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: ${colors.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2rem auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.accent};
  margin-bottom: 1rem;
`;

function UserProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    dateOfBirth: '',
    course: '',
    batch: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.data.user);
      setFormData({
        name: response.data.data.user.name || '',
        email: response.data.data.user.email || '',
        studentId: response.data.data.user.studentId || '',
        dateOfBirth: response.data.data.user.dateOfBirth ? new Date(response.data.data.user.dateOfBirth).toISOString().split('T')[0] : '',
        course: response.data.data.user.course || '',
        batch: response.data.data.user.batch || '',
        phoneNumber: response.data.data.user.phoneNumber || '',
      });
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setError('');
      fetchUser();
    } catch (err) {
      setError('Failed to update user data');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      {error && 
        <ErrorMessage>{error}</ErrorMessage>
      }
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="batch"
          placeholder="Batch"
          value={formData.batch}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </ProfileContainer>
  );
}

export default UserProfile;
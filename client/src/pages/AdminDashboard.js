import React, { useState } from 'react';
import { uploadCertificates } from '../utils/api';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
`;

const UploadForm = styled.form`
  background-color: ${colors.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: ${props => props.error ? colors.error : colors.success};
`;

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      await uploadCertificates(file);
      setMessage('Certificates uploaded successfully');
      setError('');
    } catch (err) {
      setError('Error uploading certificates: ' + err.message);
      setMessage('');
    }
  };

  return (
    <DashboardContainer>
      <h1>Admin Dashboard</h1>
      <UploadForm onSubmit={handleSubmit}>
        <h2>Upload Certificates</h2>
        <FileInput type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        <UploadButton type="submit">Upload</UploadButton>
        {message && <Message>{message}</Message>}
        {error && <Message error>{error}</Message>}
      </UploadForm>
      <div>
        <h2>Excel File Format</h2>
        <p>Please ensure your Excel file has the following columns:</p>
        <ul>
          <li>Student Name</li>
          <li>Student ID</li>
          <li>Course</li>
          <li>Start Date (YYYY-MM-DD)</li>
          <li>End Date (YYYY-MM-DD)</li>
          <li>Issue Date (YYYY-MM-DD)</li>
          <li>Certificate Number</li>
        </ul>
      </div>
    </DashboardContainer>
  );
}

export default AdminDashboard;
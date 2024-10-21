import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { uploadCertificates, getCertificates, deleteCertificate } from '../utils/api';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${colors.background};
`;

const Header = styled.h1`
  color: ${colors.primary};
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${colors.white};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
`;

const FileUploadForm = styled.form`
  margin-bottom: 2rem;
`;

const FileInput = styled.input`
  margin-right: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.secondary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primary};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: ${colors.primary};
  color: ${colors.white};
  text-align: left;
  padding: 0.5rem;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.background};
`;

const Message = styled.p`
  color: ${props => props.error ? colors.error : colors.success};
`;

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await getCertificates();
      setCertificates(response.data);
      updateStats(response.data);
    } catch (err) {
      setError('Failed to fetch certificates');
    }
  };

  const updateStats = (certs) => {
    const now = new Date();
    const active = certs.filter(cert => new Date(cert.endDate) > now).length;
    setStats({
      total: certs.length,
      active,
      expired: certs.length - active,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      const response = await uploadCertificates(file);
      setMessage(response.data.message);
      setError('');
      fetchCertificates();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while uploading the file');
      setMessage('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCertificate(id);
      setMessage('Certificate deleted successfully');
      fetchCertificates();
    } catch (err) {
      setError('Failed to delete certificate');
    }
  };

  return (
    <DashboardContainer>
      <Header>Admin Dashboard</Header>
      <StatsContainer>
        <StatCard>
          <h3>Total Certificates</h3>
          <p>{stats.total}</p>
        </StatCard>
        <StatCard>
          <h3>Active Certificates</h3>
          <p>{stats.active}</p>
        </StatCard>
        <StatCard>
          <h3>Expired Certificates</h3>
          <p>{stats.expired}</p>
        </StatCard>
      </StatsContainer>
      <FileUploadForm onSubmit={handleSubmit}>
        <FileInput type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        <Button type="submit">Upload Excel File</Button>
      </FileUploadForm>
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Student Name</Th>
            <Th>Internship Domain</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(cert => (
            <tr key={cert.id}>
              <Td>{cert.id}</Td>
              <Td>{cert.studentName}</Td>
              <Td>{cert.internshipDomain}</Td>
              <Td>{new Date(cert.startDate).toLocaleDateString()}</Td>
              <Td>{new Date(cert.endDate).toLocaleDateString()}</Td>
              <Td>
                <Button onClick={() => handleDelete(cert.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardContainer>
  );
}

export default AdminDashboard;
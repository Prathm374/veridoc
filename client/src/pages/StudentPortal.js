import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { getCertificate, downloadCertificate, getVerificationHistory } from '../utils/api';

const PortalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${colors.background};
`;

const Header = styled.h1`
  color: ${colors.primary};
`;

const SearchForm = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 1rem;
  border: 1px solid ${colors.secondary};
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

const CertificateDisplay = styled.div`
  background-color: ${colors.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
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

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');
  const [verificationHistory, setVerificationHistory] = useState([]);

  useEffect(() => {
    fetchVerificationHistory();
  }, []);

  const fetchVerificationHistory = async () => {
    try {
      const response = await getVerificationHistory();
      setVerificationHistory(response.data);
    } catch (err) {
      setError('Failed to fetch verification history');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getCertificate(certificateId);
      setCertificateData(response.data);
      setError('');
      fetchVerificationHistory();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching the certificate');
      setCertificateData(null);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadCertificate(certificateId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while downloading the certificate');
    }
  };

  return (
    <PortalContainer>
      <Header>Student Portal</Header>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          required
        />
        <Button type="submit">Search</Button>
      </SearchForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {certificateData && (
        <CertificateDisplay>
          <h2>Certificate Details</h2>
          <p>Certificate ID: {certificateData.id}</p>
          <p>Student Name: {certificateData.studentName}</p>
          <p>Internship Domain: {certificateData.internshipDomain}</p>
          <p>Start Date: {new Date(certificateData.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(certificateData.endDate).toLocaleDateString()}</p>
          <Button onClick={handleDownload}>Download Certificate</Button>
        </CertificateDisplay>
      )}
      <h2>Verification History</h2>
      
      <Table>
        <thead>
          <tr>
            <Th>Certificate ID</Th>
            <Th>Verified On</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {verificationHistory.map((record, index) => (
            <tr key={index}>
              <Td>{record.certificateId}</Td>
              <Td>{new Date(record.verifiedOn).toLocaleString()}</Td>
              <Td>{record.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PortalContainer>
  );
}

export default StudentPortal;
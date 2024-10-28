import React, { useState, useEffect } from 'react';
import { getCertificates, downloadCertificate, getVerificationHistory } from '../utils/api';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const PortalContainer = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
`;

const CertificateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CertificateItem = styled.li`
  background-color: ${colors.white};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DownloadButton = styled.button`
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

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
`;

const HistoryItem = styled.li`
  background-color: ${colors.lightGray};
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function StudentPortal() {
  const [certificates, setCertificates] = useState([]);
  const [verificationHistory, setVerificationHistory] = useState([]);

  useEffect(() => {
    fetchCertificates();
    fetchVerificationHistory();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await getCertificates();
      setCertificates(response.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const fetchVerificationHistory = async () => {
    try {
      const response = await getVerificationHistory();
      setVerificationHistory(response.data);
    } catch (error) {
      console.error('Error fetching verification history:', error);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await downloadCertificate(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `certificate_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  return (
    <PortalContainer>
      <h1>Your Certificates</h1>
      <CertificateList>
        {certificates.map((cert) => (
          <CertificateItem key={cert._id}>
            <h3>{cert.course}</h3>
            <p>Certificate Number: {cert.certificateNumber}</p>
            <p>Issue Date: {formatDate(cert.issueDate)}</p>
            <DownloadButton onClick={() => handleDownload(cert._id)}>
              Download Certificate
            </DownloadButton>
          </CertificateItem>
        ))}
      </CertificateList>

      {/* <h2>Verification History</h2>
      <HistoryList>
        {verificationHistory.map((history) => (
          <HistoryItem key={history._id}>
            <p>Certificate: {history.certificateId.certificateNumber}</p>
            <p>Verified At: {formatDate(history.verifiedAt)}</p>
            <p>Verified By: {history.verifiedBy}</p>
          </HistoryItem>
        ))}
      </HistoryList> */}
    </PortalContainer>
  );
}

export default StudentPortal;
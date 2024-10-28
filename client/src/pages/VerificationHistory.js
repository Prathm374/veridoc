import React, { useState, useEffect } from 'react';
import { getVerificationHistory } from '../utils/api';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const HistoryContainer = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
`;

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HistoryItem = styled.li`
  background-color: ${colors.white};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function VerificationHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerificationHistory();
  }, []);

  const fetchVerificationHistory = async () => {
    try {
      setLoading(true);
      const response = await getVerificationHistory();
      console.log('Fetched verification history:', response.data); // Add this line for debugging
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching verification history:', error);
      setError('Failed to fetch verification history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (history.length === 0) {
    return <div>No verification history found.</div>;
  }

  return (
    <HistoryContainer>
      <h1>Verification History</h1>
      <HistoryList>
        {history.map((item) => (
          <HistoryItem key={item._id}>
            <p>Certificate Number: {item.certificateId?.certificateNumber || 'N/A'}</p>
            <p>Student Name: {item.certificateId?.studentName || 'N/A'}</p>
            <p>Verified At: {formatDate(item.verifiedAt)}</p>
            <p>Verified By: {item.verifiedBy}</p>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
}

export default VerificationHistory;
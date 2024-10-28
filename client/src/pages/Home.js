import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${colors.secondary};
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome to VeriDoc</Title>
      <Description>
        VeriDoc is a secure and efficient certificate verification system designed to streamline the process of issuing, managing, and verifying educational certificates.
      </Description>
      <FeatureList>
        <FeatureItem>✅ Easy certificate upload and management for administrators</FeatureItem>
        <FeatureItem>🔒 Secure storage and retrieval of certificate information</FeatureItem>
        <FeatureItem>🔍 Quick and reliable certificate verification for students and employers</FeatureItem>
        <FeatureItem>📊 Comprehensive verification history tracking</FeatureItem>
      </FeatureList>
      <Button to="/login">Get Started</Button>
    </HomeContainer>
  );
}

export default Home;
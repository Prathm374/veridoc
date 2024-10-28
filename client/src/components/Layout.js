import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const Header = styled.header`
  background-color: ${colors.primary};
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${colors.white};
  text-decoration: none;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.white};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.accent};
  }
`;

function Layout({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div>
      <Header>
        <Nav>
          <div>
            {!isLoggedIn && <NavLink to="/">Home</NavLink>}
            {isLoggedIn && userRole === 'student' && (
              <>
                <NavLink to="/student">Student Portal</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            )}
            {isLoggedIn && userRole === 'admin' && (
              <>
                <NavLink to="/admin">Dashboard</NavLink>
                {/* <NavLink to="/verification-history">Verification History</NavLink> */}
                <NavLink to="/profile">Profile</NavLink>
              </>
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/admin-login">Admin Login</NavLink>
              </>
            )}
          </div>
        </Nav>
      </Header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
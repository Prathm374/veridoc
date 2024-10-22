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

  const getHomeLink = () => {
    if (!isLoggedIn) return '/login';
    return userRole === 'admin' ? '/admin' : '/student';
  };

  return (
    <div>
      <Header>
        <Nav>
          <div>
            <NavLink to={getHomeLink()}>Home</NavLink>
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
            {userRole === 'admin' && <NavLink to="/admin">Admin Dashboard</NavLink>}
          </div>
          {isLoggedIn ? (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          ) : (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}
        </Nav>
      </Header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const Header = styled.header`
  background-color: ${colors.primary};
  padding: 1rem;
  color: ${colors.white};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: ${colors.white};
  text-decoration: none;
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
`;

const Main = styled.main`
  padding: 2rem;
`;

const AdminLink = styled(Link)`
  color: ${colors.accent};
  text-decoration: none;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <>
      <Header>
        <Nav>
          <div>
            <NavLink to="/">Home</NavLink>
            {isLoggedIn && userRole === 'admin' && (
              <NavLink to="/admin">Admin Dashboard</NavLink>
            )}
            {isLoggedIn && userRole === 'student' && (
              <NavLink to="/student">Student Portal</NavLink>
            )}
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
          </div>
          <div>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <AdminLink to="/admin-login">Admin Login</AdminLink>
              </>
            )}
          </div>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
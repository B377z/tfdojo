import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">tfdojo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart"><FaShoppingCart /> Cart</Nav.Link>
            {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}><FaUser /> Sign Out</Nav.Link>
             ) : (
            <Nav.Link href="/login"><FaUser /> Sign In</Nav.Link>
             )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

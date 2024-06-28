import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import MainLogo from '../assets/images/weatherLogo.png';
import './Navbar.css';

const NavHeader = () => {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="./">
          <img
            src={MainLogo}
            alt="Main Logo"
            width="30"
            height="30"
            className="align-top"
          />
          Weather Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;

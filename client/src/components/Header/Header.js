import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <Navbar collapseOnSelect fixed='top' expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <img src={logo} alt='logo' width='50' height='50'></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href='/' className='text-secondary'>Home</Nav.Link>
          <Nav.Link href='/browse' className='text-secondary'>Browse</Nav.Link>
          <Nav.Link href='/courses' className='text-secondary'>My Courses</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='/profile' className='text-secondary'>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
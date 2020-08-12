import React, { useContext, useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

import { AuthContext } from "../../auth/Auth";
import * as icons from "../../assets/icons";
import logo from '../../assets/logo.png';
import './Header.css';
import db from '../../firebase';


const Header = () => {
  const { currentUser, pending } = useContext(AuthContext)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 992 ? true : false
  )
  // event handler on window resize
  useEffect(() => {
    const widthHandler = () => {
      setIsMobile(window.innerWidth < 992 ? true : false)
    }
    window.addEventListener('resize', widthHandler)
    return () => { window.removeEventListener('resize', widthHandler) }
  })


  if (isMobile) {
    var profileElement =
      <>
        <Nav.Link href='/profile' className='text-secondary mt-auto mb-auto'>Profile</Nav.Link>
        <Nav.Link href='/login' className='text-secondary mt-auto mb-auto'
          onClick={() => { db.auth().signOut() }}>Logout</Nav.Link>
      </>

  } else {
    profileElement =
      <NavDropdown id='profile-dropdown' className="dropdown-menu-right"
        title={<img src={icons.PersonCircle} alt='logo' width='35' height='35'></img>}>
        <NavDropdown.Item href='/profile' className='text-secondary mt-auto mb-auto'>Profile</NavDropdown.Item>
        <NavDropdown.Item href='/login' className='text-secondary mt-auto mb-auto'
          onClick={() => { db.auth().signOut() }}>Logout</NavDropdown.Item>
      </NavDropdown>
  }

  // Different headers based on whether user is signed in or not
  if (currentUser) {
    return (
      <Navbar collapseOnSelect fixed='top' expand='lg' bg='light' variant='light'>
        <Navbar.Brand href='/'>
          <img src={logo} alt='logo' width='50' height='50'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href='/' className='text-secondary mt-auto mb-auto'>Home</Nav.Link>
            <Nav.Link href='/browse' className='text-secondary mt-auto mb-auto'>Browse</Nav.Link>
            <Nav.Link href='/courses' className='text-secondary mt-auto mb-auto'>My Courses</Nav.Link>
            {profileElement}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } else {
    return (
      <Navbar collapseOnSelect fixed='top' expand='lg' bg='light' variant='light'>
        <Navbar.Brand href='/'>
          <img src={logo} alt='logo' width='50' height='50'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href='/' className='text-secondary mt-auto mb-auto'>Home</Nav.Link>
            <Nav.Link href='/login' className='text-dark font-weight-bold'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header;
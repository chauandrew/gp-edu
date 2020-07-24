import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { AuthContext } from "../../auth/Auth";
import logo from '../../assets/logo.png';
import './Header.css';
import db from '../../firebase';


const Header = () => {
  const { currentUser, pending } = useContext(AuthContext);

  if (!pending && currentUser) {
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
            <Nav.Link className='text-secondary' 
              onClick={ () => { db.auth().signOut()} }>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return null
  }
}

export default Header;
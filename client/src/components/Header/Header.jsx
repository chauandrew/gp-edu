import React, { useContext, useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { AuthContext } from "../../auth/Auth";
import * as icons from "../../assets/icons";
import logo from '../../assets/logo.png';
import './Header.css';
import db from '../../firebase';
import api from '../../utils/api'


const Header = () => {
  const { currentUser } = useContext(AuthContext)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 992 ? true : false
  )
  const [subjectElement, setSubjectElement] = useState([])

  // event handler on window resize
  useEffect(() => {
    const widthHandler = () => {
      setIsMobile(window.innerWidth < 992 ? true : false)
    }
    window.addEventListener('resize', widthHandler)
    return () => { window.removeEventListener('resize', widthHandler) }
  }, [])

  // get subject list
  useEffect(() => {
    api.getAllSubjects().then((res) => {
      // Create nav dropdown items for each subject
      let navElements = []
      for (let subjectName in res.data) {
        // TODO: You can find courses in res.data[subjectName]
        // console.log(res.data)
        navElements.push(<NavDropdown.Item href={"/subjects/" + subjectName}>
                  {subjectName.toUpperCase()}</NavDropdown.Item>)
      }
      // wrap elements in a dropdown
      let dropdown = <NavDropdown renderMenuOnMount={true} title="COURSES" id="basic-nav-dropdown" 
        className='text-body mt-auto mb-auto dropdown-nav-link-edit nav-link nav-link-fade-up'>{navElements}</NavDropdown>
      setSubjectElement(dropdown)
    })
  }, [])

  // Separate mobile UI for profile element
  if (isMobile) {
    var profileElement =
      <>
        <Nav.Link href='/profile' className='text-secondary mt-auto mb-auto nav-link nav-link-fade-up'>Profile</Nav.Link>
        <Nav.Link href='/login' className='text-secondary mt-auto mb-auto nav-link nav-link-fade-up'
          onClick={() => { db.auth().signOut() }}>Logout</Nav.Link>
      </>
  } else {
    var profileElement =
      <NavDropdown title="MY PROFILE" renderMenuOnMount={true} id='profile-dropdown' className="dropdown-menu-right dropdown-nav-link-edit nav-link nav-link-fade-up">
        <NavDropdown.Item href='/profile' className='text-secondary mt-auto mb-auto'>Profile</NavDropdown.Item>
        <NavDropdown.Item href='/login' className='text-secondary mt-auto mb-auto'
          onClick={() => { db.auth().signOut() }}>Logout</NavDropdown.Item>
      </NavDropdown>
  }

  if (currentUser) {
    var endNavElement = 
      <>
        {profileElement}
      </>
  } else {
    var endNavElement = 
      <>
        <Nav.Link href='/login' className='mt-auto mb-auto nav-link nav-link-fade-up' id="login-link">LOGIN</Nav.Link>
        <Nav.Link href='/signup' className='text-white font-weight-bold' id="sign-up-link">SIGN UP</Nav.Link>
      </>
  }

  return (
    <Navbar collapseOnSelect fixed='top' expand='lg' bg='light' className="font-weight-bold">
      <Navbar.Brand href='/' id="navbrand">
        <img src={logo} alt='logo' width='50' height='50'></img>
        AREA YOUTH EDUCATION
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href='/about' className='text-body mt-auto mb-auto nav-link nav-link-fade-up'>ABOUT US</Nav.Link>
          {subjectElement}
          {endNavElement}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
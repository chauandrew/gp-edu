import React, { useContext, useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Container, Col, Row } from 'react-bootstrap';

import { AuthContext } from "../../auth/Auth";
import logo from '../../assets/logo.png';
import './Header.css';
import db from '../../firebase';
import api from '../../utils/api'


// capitalize first letter of a string
function jsUcfirst(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}


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
    api.getAllSubjectsAndCourses().then((res) => {
      // Create nav dropdown items for each subject
      let data = res.data
      let navElements = []
      // For mobile header, only display subjects, not courses
      if (isMobile || !currentUser) {
        for (let subjectName in data) {
          navElements.push(<NavDropdown.Item className="text-secondary" 
                              href={"/subjects/" + subjectName}>{jsUcfirst(subjectName)}</NavDropdown.Item>)
        }
        setSubjectElement(<NavDropdown renderMenuOnMount={true} title="SUBJECTS" id="basic-nav-dropdown"
          className="dropdown-nav-link-edit nav-link">{navElements}</NavDropdown>)
      } else {
        // Standard header, display subjects and courses
        for (let subjectName in data) {
          let courses = data[subjectName]
          let subject = (<NavDropdown.Item className="font-weight-bold text-left" href={"/subjects/" + subjectName}>
                            {subjectName.toUpperCase()}</NavDropdown.Item>)
          let courseElements = []
          for (let i in courses) {
            courseElements.push(<NavDropdown.Item href={"/courses/" + courses[i].course_id}>
                                  {jsUcfirst(courses[i].course_name)}</NavDropdown.Item>)
          }
          navElements.push(<Col><Row className="text-left">{subject}</Row><Row>{courseElements}</Row></Col>)
        }
        // wrap elements in a dropdown
        let dropdown = <NavDropdown renderMenuOnMount={true} title="COURSES" id="basic-nav-dropdown" 
                        className="dropdown-nav-link-edit nav-link nav-link-fade-up">
            <Container>{navElements}</Container>
            </NavDropdown>
        setSubjectElement(dropdown)
      }
    })
  }, [isMobile, currentUser])

  // Separate mobile UI for profile element
  if (isMobile) {
    var profileElement =
      <>
        <Nav.Link href='/profile' className='text-secondary mt-auto mb-auto nav-link'>Profile</Nav.Link>
        <Nav.Link href='/login' className='text-secondary mt-auto mb-auto nav-link'
          onClick={() => { db.auth().signOut() }}>Logout</Nav.Link>
      </>
  } else {
    profileElement =
      <NavDropdown title="MY PROFILE" renderMenuOnMount={true} className="dropdown-nav-link-edit nav-link nav-link-fade-up">
        <NavDropdown.Item href='/profile' className='text-secondary mt-auto mb-auto'>Profile</NavDropdown.Item>
        <NavDropdown.Item href='/login' className='text-secondary mt-auto mb-auto' onClick={() => { db.auth().signOut() }}>Logout</NavDropdown.Item>
      </NavDropdown>
  }

  if (currentUser) {
    var endNavElement = <>{profileElement}</>
  } else {
    endNavElement = 
      <>
        <Nav.Link href='/login' className='mt-auto mb-auto nav-link nav-link-fade-up' id="login-link">LOGIN</Nav.Link>
        <Nav.Link href='/signup' className='text-white font-weight-bold' id="sign-up-link">SIGN UP</Nav.Link>
      </>
  }

  // remove fade up hover on mobile
  let aboutLink = isMobile ? <Nav.Link href='/about' className='text-body mt-auto mb-auto nav-link'>ABOUT US</Nav.Link>
                  : <Nav.Link href='/about' className='text-body mt-auto mb-auto nav-link nav-link-fade-up'>ABOUT US</Nav.Link>

  return (
    <Navbar collapseOnSelect fixed='top' expand='lg' bg='light' className="font-weight-bold">
      <Navbar.Brand href='/' id="navbrand">
        <img src={logo} alt='logo' width='50' height='50' id="logo"></img>
        AREA YOUTH EDUCATION
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="">
          {aboutLink}
          {subjectElement}
          {endNavElement}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
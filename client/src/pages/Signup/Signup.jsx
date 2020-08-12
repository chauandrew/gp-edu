import React from 'react';
import { Button, Form, Modal, Row, Col } from "react-bootstrap"

import api from "../../utils/api";
import createToast from "../../utils/toast";
import './Signup.css';

const Signup = ({ history }) => {
    const redirectLogin = () => {
        history.push("/login")
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { firstName, lastName, birthday, role, grade, email, password, password2 } = event.target.elements;
        let firstNameValid = handleNameChange(firstName.value);
        let lastNameValid = handleNameChange(lastName.value);
        let birthdayValid = handleBirthdayChange(birthday.value);
        let gradeValid = handleGradeChange(grade.value);
        let emailValid = handleEmailChange(email.value);
        let passwordValid = handlePasswordChange(password.value, password2.value);
        if (firstNameValid && lastNameValid && birthdayValid && 
            gradeValid && emailValid && passwordValid) {
            try {
                await api.createUser(firstName.value, lastName.value, 
                    birthday.value, role.value, grade.value, 
                    email.value, password.value);
                // reroute if verified, otherwise display error toast
                history.push("/login");
            } catch (error) {
                createToast(error)
            }
        } else {
            if (!firstNameValid || !lastNameValid) {
                createToast("Please enter your first and last name")
            } else if (!birthdayValid) {
                createToast("Please enter your birthday")
            } else if (!gradeValid) {
                createToast("Please select your grade (or N/A)")
            } else if (!emailValid) {
                createToast("Invalid email address")
            } else if (!passwordValid) {
                createToast("Password must match and be at least 8 characters long")
            }
        }
    }

    /* Makes sure name isn't empty */
    const handleNameChange = (name) => { return name !== "" }

    const handleBirthdayChange = (birthday) => {
        return (typeof birthday == "string")
    }

    // Make sure they select a grade or other
    const handleGradeChange = (grade) => { return grade !== "" }

    /* When input for email address changes, try to validate the email address */
    const handleEmailChange = (email) => {
        if (typeof email != "string") {
            return false
        }
        const emailInput = email;
        let lastAtPos = emailInput.lastIndexOf('@');
        let lastDotPos = emailInput.lastIndexOf('.');

        // Logics used to check validity of email input
        let validFormat = lastAtPos > 0 && lastDotPos > 2 && lastAtPos < lastDotPos;
        let containsDoubleAt = emailInput.lastIndexOf('@@') !== -1;
        let validOrgNameLength = emailInput.length - lastDotPos > 2;

        // If any of the logics are not satisfied, change the background color to red
        if (emailInput === "" || !validFormat || !validOrgNameLength || containsDoubleAt) {
            return false;
        }

        // Otherwise, set the background color as light blue (to indicate correctness)
        else {
            return true;
        }
    };

    /* Handles password change */
    const handlePasswordChange = (firstPwd, secondPwd) => {
        if (firstPwd === secondPwd && firstPwd.length > 7) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="page-content">
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignUp}>
                        <Row>
                            <Form.Group as={Col} md="6" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" type="firstName" placeholder = "Jane" />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" type="lastName" placeholder = "Doe" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="5" controlId="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control name="birthday" type="date" />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="role">
                                <Form.Label>I am a...</Form.Label>
                                <Form.Control as="select">
                                    <option value="student">Student</option>
                                    <option value="mentor">Mentor</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="grade">
                                <Form.Label>Grade</Form.Label>
                                <Form.Control as="select">
                                    <option value="">Choose...</option>
                                    <option value="0">Kindergaten</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="college">College</option>
                                    <option value="n/a">N/A</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name="password2" type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" 
                            className="float-right">Sign Up</Button>
                    </Form>
                    <span>Already have an account? Login <Button className="toggleLink p-0 mb-1"
                        onClick={redirectLogin} variant="link">here</Button>.</span>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default Signup;



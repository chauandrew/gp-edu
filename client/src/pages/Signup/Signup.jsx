import React from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap"

import db from "../../firebase";
import api from "../../utils/api";
import createToast from "../../utils/toast";
import './Signup.css';

const Signup = ({ history }) => {
    const redirectLogin = () => {
        history.push("/login")
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { firstName, lastName, gradYear, email, password, password2 } = event.target.elements;
        let firstNameValid = handleNameChange(firstName.value);
        let lastNameValid = handleNameChange(lastName.value);
        let gradYearValid = handleGradYearChange(gradYear.value);
        let emailValid = handleEmailChange(email.value);
        let passwordValid = handlePasswordChange(password.value, password2.value);
        if (firstNameValid && lastNameValid && 
            gradYearValid && emailValid && passwordValid) {
            try {
                // create user, then log in and redirect to home page
                await api.createUser(firstName.value, lastName.value, 
                    gradYear.value, email.value, password.value);
                const { user } = await db.auth().signInWithEmailAndPassword(
                    email.value, password.value);
                if (user) {
                    history.push("")
                    return <Redirect to="/" />;
                }
            } catch (error) {
                createToast(error)
            }
        } else {
            if (!firstNameValid || !lastNameValid) {
                createToast("Please enter your first and last name")
            } else if (!gradYearValid) {
                createToast("Grad year must look like 'YYYY' and be valid")
            } else if (!emailValid) {
                createToast("Invalid email address")
            } else if (!passwordValid) {
                createToast("Password must match and be at least 8 characters long")
            }
        }
    }

    /* Makes sure name isn't empty */
    const handleNameChange = (name) => { return name !== "" }

    // Make sure they select a gradYear or other
    const handleGradYearChange = (gradYear) => {
        if (parseInt(gradYear)) {
            let year = parseInt(gradYear)
            if (year > 1980 && year < 2050) {
                return true
            }
        }
        return false
    }

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
                <Modal.Header>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" type="firstName" placeholder = "Jane" />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="lastName" placeholder = "Doe" />
                        </Form.Group>
                        <Form.Group controlId="gradYear">
                            <Form.Label>When are you graduating high school? (eg '2021')</Form.Label>
                            <Form.Control name="gradYear" placeholder = "2024" />
                        </Form.Group>
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



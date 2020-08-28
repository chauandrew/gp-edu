import React, { useContext, useState } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap"

import db from "../../firebase";
import { AuthContext } from "../../auth/Auth";
import createToast from "../../utils/toast";
import './Login.css';

const Login = ({ history }) => {
    const redirectSignUp = () => {
        history.push("/signup")
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            console.log(email.value);
            const { user } = await db.auth().signInWithEmailAndPassword(
                email.value, password.value);
            // reroute if verified, otherwise display error toast
            if (user) {
                return <Redirect to="/" />;
            }
        } catch (error) {
            createToast(error)
        }
    }

    const { currentUser } = useContext(AuthContext);
    const [emailValue, setEmailValue] = useState("");

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="page-content">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" 
                                onChange={(e) => {setEmailValue(e.target.value)}} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <a href="/" id="pwdRecover" onClick={(e) => {
                                    e.preventDefault();
                                    // check if they inputted their email
                                    if (emailValue !== "" && emailValue.includes("@") && emailValue.includes(".")) {
                                        db.auth().sendPasswordResetEmail(emailValue).then(finished => {
                                            createToast("Password reset sent!");
                                        }).catch(error => {
                                            createToast("Something went wrong — " + error);
                                        })
                                    } else {
                                        createToast("Please input a valid email!");
                                    }
                                }}>Forgot your password?</a>
                        <Button variant="primary" type="submit" 
                            className="float-right">Login</Button>
                    </Form>
                    <span>Don't have an account? Create one <Button className="toggleLink p-0 mb-1"
                        onClick={redirectSignUp} variant="link">here</Button>.</span>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default Login;



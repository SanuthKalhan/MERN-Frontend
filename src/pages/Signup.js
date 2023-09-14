import React, { useState } from 'react';
import { Container, Row, Col, Form, Button,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useSignupMutation } from '../services/appApi';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ name,email, password });
  };

  return (
    <div className='app-BG'>
        <div className="signup__page--container">
        <Container>
            <Row>
            <Col md={6} className="signup__from--container">
                <Form onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <Form.Group>
                    <Form.Label>User Type</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter User Type"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" disabled={isLoading}>Sign Up</Button>
                </Form.Group>
                </Form>
            </Col>
            <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
        </div>
    </div>
  );
}

export default Signup;

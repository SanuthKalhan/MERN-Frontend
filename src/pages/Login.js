import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import './Login.css';
import { useLoginMutation } from "../services/appApi";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }

  return (
    <div className='app-BG'>
        <div className="login__page--container">
            <Container>
            <Row>
                <Col md={6} className="login__from--container">
                <Form onSubmit={handleLogin}>
                    <h1>User Login</h1>
                    <Form.Group>
                    <Form.Label>Email Address</Form.Label>
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
                    <Button type="submit" disabled={isLoading}>Login</Button>
                    </Form.Group>
                    <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </Form>
                </Col>
                <Col md={6} className="login__image--container"></Col>
            </Row>
            </Container>
        </div>
    </div>
  );
}

export default Login;

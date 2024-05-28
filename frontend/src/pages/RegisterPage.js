// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
    retypePassword: '',
  });
  const navigate = useNavigate();

  const { name, email, gender, dob, password, retypePassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center">Register</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gender" className="mt-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={gender}
                onChange={onChange}
                required
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dob" className="mt-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={dob}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="retypePassword" className="mt-3">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype your password"
                name="retypePassword"
                value={retypePassword}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;

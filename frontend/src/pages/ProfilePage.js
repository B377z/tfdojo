// frontend/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', config);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const { name, email, gender, dob } = profile;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text><strong>Name:</strong> {name}</Card.Text>
              <Card.Text><strong>Email:</strong> {email}</Card.Text>
              <Card.Text><strong>Gender:</strong> {gender}</Card.Text>
              <Card.Text><strong>Date of Birth:</strong> {dob}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;


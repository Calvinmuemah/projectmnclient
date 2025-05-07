import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ THIS IS THE FIX

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      const success = await resetPassword(token, password);

      if (success) {
        navigate('/login', {
          state: {
            message: 'Password has been reset successfully. You can now log in with your new password.',
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5 text-center">
                <div className="mb-4 text-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>
                </div>
                <h3 className="fw-bold mb-4">Invalid Reset Link</h3>
                <p className="text-muted mb-4">
                  The password reset link is invalid or has expired. Please request a new password reset.
                </p>
                <Link to="/forgot-password" className="btn btn-primary">
                  Request Password Reset
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-primary text-white text-center py-4">
              <h2 className="fw-bold mb-0">Reset Your Password</h2>
            </div>

            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              <p className="text-muted mb-4">Create a new password for your account.</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <Form.Text className="text-muted">Must be at least 6 characters long</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isLoading} className="py-2">
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Remember your password?{' '}
                  <Link to="/login" className="text-primary fw-bold">
                    Log In
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;

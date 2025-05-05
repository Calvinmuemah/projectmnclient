import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    try {
      setMessage('')
      setError('')
      setIsLoading(true)
      
      const success = await requestPasswordReset(email)
      
      if (success) {
        setMessage('Password reset instructions have been sent to your email')
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-primary text-white text-center py-4">
              <h2 className="fw-bold mb-0">Forgot Password</h2>
            </div>
            
            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              {message && (
                <Alert variant="success" className="mb-4">
                  {message}
                </Alert>
              )}
              
              <p className="text-muted mb-4">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="py-2"
                  >
                    {isLoading ? 'Sending...' : 'Reset Password'}
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
          
          <div className="text-center mt-3">
            <Link to="/" className="text-decoration-none">
              &larr; Back to Home
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword
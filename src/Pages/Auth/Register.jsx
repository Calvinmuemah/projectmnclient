import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    try {
      setError('')
      setIsLoading(true)
      
      const success = await register(name, email, password)
      
      if (success) {
        navigate('/login')
      }
    } catch (err) {
      setError('Failed to create an account. Please try again.')
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
              <h2 className="fw-bold mb-0">Create an Account</h2>
            </div>
            
            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
                
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

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                  <Form.Text className="text-muted">
                    Must be at least 6 characters long
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="terms">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        I agree to the{' '}
                        <a href="#" className="text-decoration-none">Terms of Service</a> and{' '}
                        <a href="#" className="text-decoration-none">Privacy Policy</a>
                      </span>
                    }
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
                    {isLoading ? 'Creating Account...' : 'Register'}
                  </Button>
                </div>
              </Form>
              
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account?{' '}
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

export default Register
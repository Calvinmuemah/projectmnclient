import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    try {
      setError('')
      setSuccess('')
      setIsLoading(true)

      const success = await login(email, password)

      if (success) {
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => navigate(from, { replace: true }), 1500)
      }
    } catch (err) {
      // Check for server response
      const message = err?.response?.data?.message || 'Failed to log in. Please try again.'
      setError(message)
      console.error('Login error:', err)
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
              <h2 className="fw-bold mb-0">Welcome Back</h2>
            </div>

            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-4">
                  {success}
                </Alert>
              )}

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

                <Form.Group className="mb-4" controlId="password">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="mb-0">Password</Form.Label>
                    <Link to="/forgot-password" className="text-primary small">
                      Forgot Password?
                    </Link>
                  </div>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="remember">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="py-2"
                  >
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold">
                    Register
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-muted small mb-0">
                  By logging in, you agree to our{' '}
                  <a href="#" className="text-decoration-none">Terms of Service</a> and{' '}
                  <a href="#" className="text-decoration-none">Privacy Policy</a>.
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

export default Login

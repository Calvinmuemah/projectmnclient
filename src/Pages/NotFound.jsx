import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const NotFound = () => {
  const { user } = useAuth()
  
  return (
    <Container className="py-5 my-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead text-muted mb-5">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button 
              as={Link} 
              to="/" 
              variant="primary" 
              className="px-4"
            >
              Go to Home
            </Button>
            {user && (
              <Button 
                as={Link} 
                to="/dashboard" 
                variant="outline-primary" 
                className="px-4"
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
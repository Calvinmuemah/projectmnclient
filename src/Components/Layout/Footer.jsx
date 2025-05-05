import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">
              <span className="text-primary">Project</span>Hub
            </h5>
            <p className="mb-3">
              Your all-in-one solution for project management. Create, track, and share your projects with ease.
            </p>
            <p className="small text-muted">
              &copy; {currentYear} ProjectHub. All rights reserved.
            </p>
          </Col>
          
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-light">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none text-light">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/projects" className="text-decoration-none text-light">Projects</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-light">Documentation</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-light">API References</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-light">Support Center</a>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="fw-bold mb-3">Stay Connected</h6>
            <p className="mb-3">Subscribe to our newsletter for updates</p>
            <div className="d-flex">
              <input 
                type="email" 
                className="form-control me-2" 
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-primary">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="mb-0 small">
              Made with ❤️ for better project management
            </p>
          </Col>
          <Col md={6}>
            <ul className="list-inline mb-0 text-md-end">
              <li className="list-inline-item me-3">
                <a href="#" className="text-decoration-none text-light">Privacy</a>
              </li>
              <li className="list-inline-item me-3">
                <a href="#" className="text-decoration-none text-light">Terms</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-light">Cookies</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
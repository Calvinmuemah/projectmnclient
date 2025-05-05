import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const handleClose = () => setShowOffcanvas(false)
  const handleShow = () => setShowOffcanvas(true)

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <header>
      <Navbar bg="white" expand="lg" fixed="top" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-primary">Project</span>Hub
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="responsive-navbar-nav" 
            onClick={handleShow}
          />
          
          {/* Desktop Navigation */}
          <Navbar.Collapse id="responsive-navbar-nav" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              {user && (
                <>
                  <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/projects">
                    Projects
                  </Nav.Link>
                </>
              )}
            </Nav>
            
            <Nav>
              {user ? (
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="rounded-circle"
                      width="32" 
                      height="32"
                    />
                    <span className="ms-2">{user.name}</span>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleLogout}
                    className="me-2"
                  >
                    Logout
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/projects/create')}
                  >
                    New Project
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline-primary" 
                    as={Link} 
                    to="/login"
                    className="me-2"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          
          {/* Mobile Navigation (Offcanvas) */}
          <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="fw-bold">
                <span className="text-primary">Project</span>Hub
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column mb-4">
                <Nav.Link as={NavLink} to="/" onClick={handleClose} className="py-2">
                  Home
                </Nav.Link>
                {user && (
                  <>
                    <Nav.Link as={NavLink} to="/dashboard" onClick={handleClose} className="py-2">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/projects" onClick={handleClose} className="py-2">
                      Projects
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/profile" onClick={handleClose} className="py-2">
                      Profile
                    </Nav.Link>
                  </>
                )}
              </Nav>
              
              <div className="d-grid gap-2">
                {user ? (
                  <>
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        navigate('/projects/create')
                        handleClose()
                      }}
                      className="mb-2"
                    >
                      New Project
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="primary" 
                      as={Link} 
                      to="/login" 
                      onClick={handleClose}
                      className="mb-2"
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      as={Link} 
                      to="/register" 
                      onClick={handleClose}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
      {/* Add padding to account for fixed navbar */}
      <div style={{ paddingTop: '76px' }}></div>
    </header>
  )
}

export default Header
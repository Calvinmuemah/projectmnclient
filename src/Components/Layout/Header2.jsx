import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../../Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    setShow(false);
  };

  return (
    <>
      <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-primary">Project</span>Hub
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShow(true)} />

          <Navbar.Collapse className="d-none d-lg-flex justify-content-between w-100">
            {/* Left nav */}
            <Nav className="align-items-center">
              {user && (
                <>
                  {/* <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link> */}
                  <Nav.Link as={NavLink} to="/projects">
                    Projects
                  </Nav.Link>
                  {/* <Nav.Link as={NavLink} to="/projects">
                    Profile
                  </Nav.Link> */}
                </>
              )}
            </Nav>

            {/* Right nav */}
            <Nav className="align-items-center">
              {user ? (
                <>
                  <Button variant="outline-primary" onClick={handleLogout} className="me-2">
                    Logout
                  </Button>
                  <div className="d-flex align-items-center me-3">
                    <Link
                      to="/profile"
                    >
                      <img
                      src={user.avatar}
                      // alt={user.name}
                      className="rounded-circle"
                      width="32"
                      height="32"
                    />
                    </Link>
                    
                    {/* <span className="ms-2">{user.name}</span> */}
                  </div>
                  
                  {/* <Button
                    variant="primary"
                    onClick={() => navigate('/projects/create')}
                  >
                    New Project
                  </Button> */}
                </>
              ) : (
                <>
                  <Button variant="outline-primary" as={Link} to="/login" className="me-2">
                    Login
                  </Button>
                  <Button variant="primary" as={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for mobile */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="text-primary">Project</span>Hub
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* <Nav.Link as={NavLink} to="/" onClick={() => setShow(false)}>
              Home
            </Nav.Link> */}
            {user && (
              <>
                {/* <Nav.Link as={NavLink} to="/dashboard" onClick={() => setShow(false)}>
                  Dashboard
                </Nav.Link> */}
                <Nav.Link as={NavLink} to="/projects" onClick={() => setShow(false)}>
                  Projects
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile" onClick={() => setShow(false)}>
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>

          <div className="mt-4 d-grid gap-2">
            {user ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate('/projects/create');
                    setShow(false);
                  }}
                >
                  New Project
                </Button>
                <Button variant="outline-primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" as={Link} to="/login" onClick={() => setShow(false)}>
                  Login
                </Button>
                <Button
                  variant="outline-primary"
                  as={Link}
                  to="/register"
                  onClick={() => setShow(false)}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offset for fixed navbar */}
      <div style={{ paddingTop: '76px' }}></div>
    </>
  );
};

export default Header;

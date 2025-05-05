import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const LandingPage = () => {
  const { user } = useAuth()

  const features = [
    {
      title: 'Project Management',
      description: 'Create, manage, and track all your projects in one place with intuitive tools.',
      icon: '📋'
    },
    {
      title: 'Task Organization',
      description: 'Break down projects into tasks and subtasks to stay on top of your workflow.',
      icon: '✓'
    },
    {
      title: 'Progress Tracking',
      description: 'Visualize project progress with interactive charts and status indicators.',
      icon: '📊'
    },
    {
      title: 'Easy Sharing',
      description: 'Share your projects and achievements on popular social media platforms.',
      icon: '🔗'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      content: 'ProjectHub has transformed how our team manages projects. The interface is clean and intuitive, making it easy for everyone to stay updated.',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    {
      name: 'Michael Thompson',
      role: 'Freelance Designer',
      content: 'As a freelancer, keeping track of multiple projects used to be a challenge. With ProjectHub, I can organize everything in one place.',
      avatar: 'https://i.pravatar.cc/150?img=53'
    },
    {
      name: 'Rebecca Chen',
      role: 'Marketing Director',
      content: 'The social sharing features have been a game-changer for showcasing our work. ProjectHub simplifies our project management and promotion.',
      avatar: 'https://i.pravatar.cc/150?img=48'
    }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 animate-fade-in">
                Manage Your Projects with Confidence
              </h1>
              <p className="lead mb-4 animate-fade-in">
                Keep all your projects organized, track progress, and share your accomplishments with the world.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start animate-fade-in">
                {user ? (
                  <Button 
                    as={Link} 
                    to="/dashboard" 
                    variant="light" 
                    size="lg" 
                    className="fw-bold px-4 me-md-2"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      as={Link} 
                      to="/register" 
                      variant="light" 
                      size="lg" 
                      className="fw-bold px-4 me-md-2"
                    >
                      Get Started
                    </Button>
                    <Button 
                      as={Link} 
                      to="/login" 
                      variant="outline-light" 
                      size="lg" 
                      className="px-4"
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Project management" 
                className="img-fluid rounded shadow-lg animate-fade-in" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Everything You Need to Succeed</h2>
            <p className="lead text-muted">
              Powerful features to help you manage your projects effectively
            </p>
          </div>
          
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon fs-1 mb-3">{feature.icon}</div>
                    <Card.Title className="fw-bold mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted">
              Managing your projects has never been easier
            </p>
          </div>
          
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="img-fluid rounded shadow-lg" 
              />
            </Col>
            <Col lg={6}>
              <div className="ps-lg-5">
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle p-3 me-3 fs-4 fw-bold text-center" style={{width: '50px', height: '50px'}}>1</div>
                    <h4 className="fw-bold mb-0">Create Your Project</h4>
                  </div>
                  <p className="text-muted ms-5 ps-3">Define your project details, set deadlines, and establish goals.</p>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle p-3 me-3 fs-4 fw-bold text-center" style={{width: '50px', height: '50px'}}>2</div>
                    <h4 className="fw-bold mb-0">Track Progress</h4>
                  </div>
                  <p className="text-muted ms-5 ps-3">Add tasks, update statuses, and monitor project completion percentage.</p>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle p-3 me-3 fs-4 fw-bold text-center" style={{width: '50px', height: '50px'}}>3</div>
                    <h4 className="fw-bold mb-0">Share Results</h4>
                  </div>
                  <p className="text-muted ms-5 ps-3">Share your achievements on social media or with your team members.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5 bg-light">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted">
              Don't just take our word for it – hear from our satisfied users
            </p>
          </div>
          
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <span className="text-warning">★★★★★</span>
                    </div>
                    <Card.Text className="mb-4">
                      "{testimonial.content}"
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="rounded-circle me-3" 
                        width="48" 
                        height="48" 
                      />
                      <div>
                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta py-5 bg-primary text-white">
        <Container className="py-5 text-center">
          <h2 className="fw-bold mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join thousands of users who trust ProjectHub for their project management needs.
          </p>
          {user ? (
            <Button 
              as={Link} 
              to="/dashboard" 
              variant="light" 
              size="lg" 
              className="fw-bold px-5"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              as={Link} 
              to="/register" 
              variant="light" 
              size="lg" 
              className="fw-bold px-5"
            >
              Create Free Account
            </Button>
          )}
        </Container>
      </section>
    </div>
  )
}

export default LandingPage
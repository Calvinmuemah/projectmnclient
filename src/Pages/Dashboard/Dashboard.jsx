import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useProjects } from '../../Contexts/ProjectContext'
import { PROJECT_STATUSES } from '../../Contexts/ProjectContext'
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { user } = useAuth()
  const { getUserProjects, isLoading } = useProjects()
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    planning: 0,
    onHold: 0
  })

  useEffect(() => {
    if (!isLoading) {
      const userProjects = getUserProjects()
      setProjects(userProjects)

      const total = userProjects.length
      const completed = userProjects.filter(p => p.status === 'Completed').length
      const inProgress = userProjects.filter(p => p.status === 'In Progress').length
      const planning = userProjects.filter(p => p.status === 'Planning').length
      const onHold = userProjects.filter(p => p.status === 'On Hold').length

      setStats({
        total,
        completed,
        inProgress,
        planning,
        onHold
      })
    }
  }, [isLoading, getUserProjects])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const recentProjects = [...projects].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  }).slice(0, 3)

  const getProjectsByStatus = (status) => {
    return projects.filter(p => p.status === status)
  }

  return (
    <div className="dashboard-page page-container">
      <Container>
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 bg-primary text-white shadow">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h2 className="fw-bold mb-3">Welcome back, {user.name}!</h2>
                    <p className="mb-4">Here's what's happening with your projects today.</p>
                    <Button as={Link} to="/projects/create" variant="light" className="fw-bold">
                      Create New Project
                    </Button>
                  </Col>
                  <Col md={4} className="d-none d-md-block text-end">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="rounded-circle border border-3 border-white" 
                      width="100" 
                      height="100"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="mb-5">
          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">Total Projects</h5>
                  <div className="badge bg-primary rounded-pill">{stats.total}</div>
                </div>
                <div className="text-muted small">All your projects</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">In Progress</h5>
                  <div className="badge bg-warning rounded-pill">{stats.inProgress}</div>
                </div>
                <div className="text-muted small">Current active projects</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">Completed</h5>
                  <div className="badge bg-success rounded-pill">{stats.completed}</div>
                </div>
                <div className="text-muted small">Finished projects</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">Planning</h5>
                  <div className="badge bg-info rounded-pill">{stats.planning}</div>
                </div>
                <div className="text-muted small">Projects in planning phase</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Projects */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white p-4 border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="fw-bold mb-0">Recent Projects</h4>
                  <Button as={Link} to="/projects" variant="outline-primary" size="sm">
                    View All
                  </Button>
                </div>
              </Card.Header>

              <Card.Body className="p-0">
                {recentProjects.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="py-3 ps-4">Project Name</th>
                          <th className="py-3">Category</th>
                          <th className="py-3">Status</th>
                          <th className="py-3">Progress</th>
                          <th className="py-3 pe-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProjects.map(project => (
                          <tr key={project.id}>
                            <td className="ps-4">
                              <div className="fw-bold">{project.title}</div>
                              <div className="text-muted small">
                                {new Date(project.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td>{project.category}</td>
                            <td>
                              <span className={`badge ${
                                project.status === 'Completed' ? 'bg-success' :
                                project.status === 'In Progress' ? 'bg-warning' :
                                project.status === 'On Hold' ? 'bg-danger' :
                                'bg-info'
                              }`}>
                                {project.status}
                              </span>
                            </td>
                            <td style={{ width: '20%' }}>
                              <div className="d-flex align-items-center">
                                <ProgressBar 
                                  now={project.progress} 
                                  variant={
                                    project.progress < 30 ? 'danger' :
                                    project.progress < 70 ? 'warning' :
                                    'success'
                                  }
                                  style={{ height: '8px', width: '100%' }}
                                  className="me-2"
                                />
                                <span className="small ms-2">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="pe-4">
                              <Button as={Link} to={`/projects/${project.id}`} variant="outline-primary" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-5">
                    <p className="mb-3">You don't have any projects yet.</p>
                    <Button as={Link} to="/projects/create" variant="primary">
                      Create Your First Project
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Project Status Distribution */}
        <Row>
          <Col lg={7} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white p-4 border-0">
                <h4 className="fw-bold mb-0">Project Status Distribution</h4>
              </Card.Header>
              <Card.Body>
                {PROJECT_STATUSES.map(status => {
                  const projectsWithStatus = getProjectsByStatus(status)
                  const percentage = stats.total ? Math.round((projectsWithStatus.length / stats.total) * 100) : 0

                  return (
                    <div key={status} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div>
                          <span className={`badge ${
                            status === 'Completed' ? 'bg-success' :
                            status === 'In Progress' ? 'bg-warning' :
                            status === 'On Hold' ? 'bg-danger' :
                            status === 'Cancelled' ? 'bg-secondary' :
                            'bg-info'
                          } me-2`}>
                            {status}
                          </span>
                          <span className="small">{projectsWithStatus.length} projects</span>
                        </div>
                        <span className="small">{percentage}%</span>
                      </div>
                      <ProgressBar 
                        now={percentage} 
                        variant={
                          status === 'Completed' ? 'success' :
                          status === 'In Progress' ? 'warning' :
                          status === 'On Hold' ? 'danger' :
                          status === 'Cancelled' ? 'secondary' :
                          'info'
                        }
                        style={{ height: '8px' }}
                      />
                    </div>
                  )
                })}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white p-4 border-0">
                <h4 className="fw-bold mb-0">Quick Actions</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-3">
                  <Button as={Link} to="/projects/create" variant="primary">
                    Create New Project
                  </Button>
                  <Button as={Link} to="/projects" variant="outline-primary">
                    View All Projects
                  </Button>
                  <Button as={Link} to="/profile" variant="outline-secondary">
                    Edit Profile
                  </Button>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <h5 className="fw-bold mb-3">Need Help?</h5>
                  <p className="text-muted mb-3">
                    Check out our documentation or contact support if you need assistance.
                  </p>
                  <Button variant="link" className="text-decoration-none">
                    View Documentation
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard

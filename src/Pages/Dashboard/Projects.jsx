import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, ProgressBar, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useProjects, PROJECT_CATEGORIES, PROJECT_STATUSES } from '../../Contexts/ProjectContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const Projects = () => {
  const { getUserProjects, isLoading } = useProjects()
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    if (!isLoading) {
      const userProjects = getUserProjects()
      setProjects(userProjects)
      setFilteredProjects(userProjects)
    }
  }, [isLoading, getUserProjects])

  // Filter and sort projects
  useEffect(() => {
    let result = [...projects]
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply category filter
    if (filterCategory) {
      result = result.filter(project => project.category === filterCategory)
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(project => project.status === filterStatus)
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'progress-asc':
        result.sort((a, b) => a.progress - b.progress)
        break
      case 'progress-desc':
        result.sort((a, b) => b.progress - a.progress)
        break
      default:
        break
    }
    
    setFilteredProjects(result)
  }, [projects, searchQuery, filterCategory, filterStatus, sortBy])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('')
    setFilterCategory('')
    setFilterStatus('')
    setSortBy('newest')
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-page page-container">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">My Projects</h2>
          <Button 
            as={Link} 
            to="/projects/create" 
            variant="primary"
          >
            Create New Project
          </Button>
        </div>
        
        {/* Filters */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <Row className="g-3">
              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
              
              <Col md={2} sm={6}>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {PROJECT_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col md={2} sm={6}>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {PROJECT_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col md={2} sm={6}>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="progress-asc">Progress (Low to High)</option>
                  <option value="progress-desc">Progress (High to Low)</option>
                </Form.Select>
              </Col>
              
              <Col md={2} sm={6}>
                <Button 
                  variant="outline-secondary" 
                  className="w-100"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {/* Projects List */}
        <Row>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <Col lg={4} md={6} className="mb-4" key={project.id}>
                <Card className="border-0 h-100 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <Badge bg={
                        project.status === 'Completed' ? 'success' :
                        project.status === 'In Progress' ? 'warning' :
                        project.status === 'On Hold' ? 'danger' :
                        project.status === 'Cancelled' ? 'secondary' :
                        'info'
                      }>
                        {project.status}
                      </Badge>
                      <small className="text-muted">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    
                    <h5 className="card-title fw-bold mb-2">{project.title}</h5>
                    
                    <p className="text-muted small mb-3">
                      <Badge bg="light" text="dark" className="me-2">
                        {project.category}
                      </Badge>
                      {project.tasks.length} Tasks
                    </p>
                    
                    <p className="card-text text-muted mb-4" style={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      minHeight: '4.5em'
                    }}>
                      {project.description}
                    </p>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small">Progress</span>
                        <span className="small">{project.progress}%</span>
                      </div>
                      <ProgressBar 
                        now={project.progress} 
                        variant={
                          project.progress < 30 ? 'danger' :
                          project.progress < 70 ? 'warning' :
                          'success'
                        }
                        style={{ height: '8px' }}
                      />
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button 
                        as={Link} 
                        to={`/projects/${project.id}`} 
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5 text-center">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-folder text-muted" viewBox="0 0 16 16">
                      <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                    </svg>
                  </div>
                  
                  {(searchQuery || filterCategory || filterStatus) ? (
                    <>
                      <h5 className="fw-bold mb-3">No matching projects found</h5>
                      <p className="text-muted mb-4">
                        Try adjusting your search or filter criteria to find what you're looking for.
                      </p>
                      <Button 
                        variant="primary" 
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </>
                  ) : (
                    <>
                      <h5 className="fw-bold mb-3">No projects yet</h5>
                      <p className="text-muted mb-4">
                        You haven't created any projects yet. Get started by creating your first project.
                      </p>
                      <Button 
                        as={Link} 
                        to="/projects/create" 
                        variant="primary"
                      >
                        Create Your First Project
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Projects
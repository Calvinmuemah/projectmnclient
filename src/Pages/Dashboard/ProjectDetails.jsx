import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Form, Modal, ListGroup } from 'react-bootstrap'
import { 
  FacebookShareButton, TwitterShareButton, LinkedinShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon
} from 'react-share'
import { toast } from 'react-toastify'
import { useProjects } from '../../Contexts/ProjectContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectDetails = () => {
  const { id } = useParams()
  const { getProject, deleteProject, addTask, toggleTaskCompletion, deleteTask } = useProjects()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  
  // Get the current URL for sharing
  const shareUrl = window.location.href

  useEffect(() => {
    const loadProject = () => {
      try {
        const projectData = getProject(id)
        if (projectData) {
          setProject(projectData)
        } else {
          // Project not found
          toast.error('Project not found')
          navigate('/projects')
        }
      } catch (error) {
        console.error('Error loading project:', error)
        toast.error('Failed to load project details')
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [id, getProject, navigate])

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    
    const success = addTask(id, newTaskTitle)
    if (success) {
      setNewTaskTitle('')
      // Refresh project data
      setProject(getProject(id))
    }
  }

  const handleToggleTask = (taskId) => {
    const success = toggleTaskCompletion(id, taskId)
    if (success) {
      // Refresh project data
      setProject(getProject(id))
    }
  }

  const handleDeleteTask = (taskId) => {
    const success = deleteTask(id, taskId)
    if (success) {
      // Refresh project data
      setProject(getProject(id))
    }
  }

  const handleDeleteProject = () => {
    const success = deleteProject(id)
    if (success) {
      setShowDeleteModal(false)
      navigate('/projects')
    }
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

  if (!project) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5 border-0 shadow-sm">
          <Card.Body>
            <h3>Project Not Found</h3>
            <p className="text-muted">The project you're looking for doesn't exist or has been deleted.</p>
            <Button as={Link} to="/projects" variant="primary">
              View All Projects
            </Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <div className="project-details-page page-container">
      <Container>
        {/* Header Section */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
              <h2 className="fw-bold mb-3 mb-md-0">{project.title}</h2>
              <div className="d-flex gap-2">
                <Button 
                  as={Link} 
                  to={`/projects/${id}/edit`} 
                  variant="outline-primary"
                >
                  Edit Project
                </Button>
                <Button 
                  variant="outline-danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <Badge 
                bg={
                  project.status === 'Completed' ? 'success' :
                  project.status === 'In Progress' ? 'warning' :
                  project.status === 'On Hold' ? 'danger' :
                  project.status === 'Cancelled' ? 'secondary' :
                  'info'
                }
                className="me-2"
              >
                {project.status}
              </Badge>
              <Badge bg="light" text="dark" className="me-2">
                {project.category}
              </Badge>
              <span className="text-muted small">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="mb-4">{project.description}</p>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Progress</h6>
                <span>{project.progress}%</span>
              </div>
              <ProgressBar 
                now={project.progress} 
                variant={
                  project.progress < 30 ? 'danger' :
                  project.progress < 70 ? 'warning' :
                  'success'
                }
                style={{ height: '10px' }}
              />
            </div>
            
            <Row className="mt-4">
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="text-muted small mb-1">Start Date</div>
                <div className="fw-bold">
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
                </div>
              </Col>
              
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="text-muted small mb-1">End Date</div>
                <div className="fw-bold">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
                </div>
              </Col>
              
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="text-muted small mb-1">Tasks</div>
                <div className="fw-bold">
                  {project.tasks.length} total
                  {project.tasks.length > 0 && (
                    <span className="text-muted ms-1">
                      ({project.tasks.filter(t => t.completed).length} completed)
                    </span>
                  )}
                </div>
              </Col>
              
              <Col md={3} sm={6}>
                <div className="text-muted small mb-1">Share</div>
                <div className="d-flex gap-2">
                  <FacebookShareButton url={shareUrl} quote={`Check out my project: ${project.title}`}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={`Check out my project: ${project.title}`}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={`Check out my project: ${project.title}`}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {/* Tasks Section */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white p-4 border-0">
                <h4 className="fw-bold mb-0">Tasks</h4>
              </Card.Header>
              
              <Card.Body className="p-4">
                <Form onSubmit={handleAddTask} className="mb-4">
                  <Form.Group className="mb-3" controlId="newTask">
                    <Form.Label>Add new task</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Enter task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                      />
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="ms-2"
                      >
                        Add
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
                
                {project.tasks.length > 0 ? (
                  <ListGroup variant="flush">
                    {project.tasks.map(task => (
                      <ListGroup.Item key={task.id} className="d-flex align-items-center py-3 px-0 border-bottom">
                        <Form.Check
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          label={task.title}
                          className={`me-auto ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                        />
                        <Button 
                          variant="link" 
                          className="text-danger p-0"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label="Delete task"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                          </svg>
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">No tasks yet. Add your first task above.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Actions Section */}
        <div className="d-flex justify-content-between mb-4">
          <Button 
            as={Link} 
            to="/projects" 
            variant="outline-secondary"
          >
            Back to Projects
          </Button>
          
          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to={`/projects/${id}/edit`} 
              variant="primary"
            >
              Edit Project
            </Button>
          </div>
        </div>
        
        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete <strong>{project.title}</strong>?</p>
            <p className="text-danger mb-0">This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteProject}>
              Delete Project
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default ProjectDetails
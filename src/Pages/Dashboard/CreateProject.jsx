import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useProjects, PROJECT_CATEGORIES, PROJECT_STATUSES } from '../../Contexts/ProjectContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(PROJECT_CATEGORIES[0])
  const [status, setStatus] = useState('Planning')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { createProject } = useProjects()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!title || !description || !category || !status) {
      setError('Please fill all required fields')
      return
    }
    
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError('End date cannot be before start date')
      return
    }
    
    try {
      setError('')
      setIsLoading(true)
      
      const projectData = {
        title,
        description,
        category,
        status,
        startDate: startDate || null,
        endDate: endDate || null
      }
      
      const projectId = await createProject(projectData)
      
      if (projectId) {
        navigate(`/projects/${projectId}`)
      }
    } catch (err) {
      setError('Failed to create project. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-project-page page-container">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Create New Project</h2>
          <Button 
            as={Link} 
            to="/projects" 
            variant="outline-secondary"
          >
            Cancel
          </Button>
        </div>
        
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={8}>
                  <Form.Group className="mb-4" controlId="title">
                    <Form.Label>Project Title <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter project title"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="description">
                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter project description"
                      required
                    />
                  </Form.Group>
                </Col>
                
                <Col lg={4}>
                  <Form.Group className="mb-4" controlId="category">
                    <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      {PROJECT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="status">
                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      {PROJECT_STATUSES.map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button 
                  as={Link} 
                  to="/projects" 
                  variant="outline-secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default CreateProject
import { Link } from 'react-router-dom'
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap'

const ProjectCard = ({ project }) => {
  return (
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
  )
}

export default ProjectCard
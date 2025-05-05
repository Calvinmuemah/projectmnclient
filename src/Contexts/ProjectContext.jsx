import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

// Create context
const ProjectContext = createContext(null)

// Local storage key
const PROJECTS_STORAGE_KEY = 'project_hub_projects'

// Exported constants
export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile App',
  'UX/UI Design',
  'Marketing',
  'Branding',
  'Content Creation',
  'Business',
  'Personal'
]

export const PROJECT_STATUSES = [
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
  'Cancelled'
]

// Provider component
export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY)
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects))
        } else {
          const sampleProjects = [
            {
              id: 1,
              title: 'E-commerce Website',
              description: 'A full-stack e-commerce website with product listings, cart, and checkout functionality.',
              category: 'Web Development',
              status: 'In Progress',
              startDate: '2023-09-01',
              endDate: '2023-11-30',
              progress: 65,
              userId: 1,
              collaborators: [],
              tasks: [
                { id: 1, title: 'Design homepage', completed: true },
                { id: 2, title: 'Create product database', completed: true },
                { id: 3, title: 'Implement shopping cart', completed: false }
              ],
              createdAt: '2023-08-15T12:00:00Z'
            },
            {
              id: 2,
              title: 'Mobile App Redesign',
              description: 'Redesigning the user interface of an existing mobile application to improve user experience.',
              category: 'UX/UI Design',
              status: 'Planning',
              startDate: '2023-10-01',
              endDate: '2023-12-15',
              progress: 25,
              userId: 1,
              collaborators: [],
              tasks: [
                { id: 1, title: 'User research', completed: true },
                { id: 2, title: 'Create wireframes', completed: false },
                { id: 3, title: 'Design high-fidelity mockups', completed: false }
              ],
              createdAt: '2023-09-20T10:30:00Z'
            }
          ]
          setProjects(sampleProjects)
          localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(sampleProjects))
        }
      } catch (error) {
        console.error('Error loading projects:', error)
        toast.error('Failed to load projects. Please refresh the page.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
    }
  }, [projects, isLoading])

  const getUserProjects = () => {
    if (!user) return []
    return projects.filter(project => project.userId === user.id)
  }

  const getProject = (id) => {
    return projects.find(project => project.id === parseInt(id))
  }

  const createProject = (projectData) => {
    try {
      const newProject = {
        ...projectData,
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        userId: user.id,
        collaborators: [],
        tasks: [],
        createdAt: new Date().toISOString(),
        progress: 0
      }
      setProjects([...projects, newProject])
      toast.success('Project created successfully')
      return newProject.id
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project. Please try again.')
      return null
    }
  }

  const updateProject = (id, updatedData) => {
    try {
      const updatedProjects = projects.map(project =>
        project.id === parseInt(id) ? { ...project, ...updatedData } : project
      )
      setProjects(updatedProjects)
      toast.success('Project updated successfully')
      return true
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project. Please try again.')
      return false
    }
  }

  const deleteProject = (id) => {
    try {
      const updatedProjects = projects.filter(project => project.id !== parseInt(id))
      setProjects(updatedProjects)
      toast.success('Project deleted successfully')
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project. Please try again.')
      return false
    }
  }

  const addTask = (projectId, taskTitle) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === parseInt(projectId)) {
          const newTask = {
            id: project.tasks.length > 0 ? Math.max(...project.tasks.map(t => t.id)) + 1 : 1,
            title: taskTitle,
            completed: false
          }
          return {
            ...project,
            tasks: [...project.tasks, newTask]
          }
        }
        return project
      })
      setProjects(updatedProjects)
      toast.success('Task added successfully')
      return true
    } catch (error) {
      console.error('Error adding task:', error)
      toast.error('Failed to add task. Please try again.')
      return false
    }
  }

  const toggleTaskCompletion = (projectId, taskId) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === parseInt(projectId)) {
          const updatedTasks = project.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
          const completed = updatedTasks.filter(t => t.completed).length
          const progress = updatedTasks.length > 0 ? Math.round((completed / updatedTasks.length) * 100) : 0
          return { ...project, tasks: updatedTasks, progress }
        }
        return project
      })
      setProjects(updatedProjects)
      return true
    } catch (error) {
      console.error('Error toggling task:', error)
      toast.error('Failed to update task. Please try again.')
      return false
    }
  }

  const deleteTask = (projectId, taskId) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === parseInt(projectId)) {
          const updatedTasks = project.tasks.filter(task => task.id !== taskId)
          const completed = updatedTasks.filter(t => t.completed).length
          const progress = updatedTasks.length > 0 ? Math.round((completed / updatedTasks.length) * 100) : 0
          return { ...project, tasks: updatedTasks, progress }
        }
        return project
      })
      setProjects(updatedProjects)
      toast.success('Task deleted successfully')
      return true
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task. Please try again.')
      return false
    }
  }

  const value = {
    projects,
    isLoading,
    getUserProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addTask,
    toggleTaskCompletion,
    deleteTask
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

// Custom hook
export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}

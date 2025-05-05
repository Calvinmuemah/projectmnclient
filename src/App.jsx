import { useEffect } from 'react'
// import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './Contexts/AuthContext'

// Components
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import ProtectedRoute from './Components/Auth/ProtectedRoute'

// Pages
import LandingPage from './Pages/Landing'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResetPassword from './Pages/Auth/ResetPassword'
import Dashboard from './Pages/Dashboard/Dashboard'
import Projects from './Pages/Dashboard/Projects'
import ProjectDetails from './Pages/Dashboard/ProjectDetails'
import CreateProject from './Pages/Dashboard/CreateProject'
import EditProject from './Pages/Dashboard/EditProject'
import Profile from './Pages/Dashboard/Profile'
import NotFound from './Pages/NotFound'

function App() {
  // const { user, isLoading } = useAuth()
  // const navigate = useNavigate()
  const { isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="animate-fade-in">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
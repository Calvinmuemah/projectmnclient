import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute user:', user); // Add log to verify user state

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute
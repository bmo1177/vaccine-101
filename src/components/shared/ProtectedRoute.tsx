import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'doctor' | 'parent'>;
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user doesn't have permission
    const dashboardRoutes = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      parent: '/parent/dashboard'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }

  return <>{children}</>;
};
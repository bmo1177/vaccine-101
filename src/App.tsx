import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AddChildToParent from "./pages/AddChildToParent";
import NewRequest from "./pages/NewRequest";
import AdminDashboard from "./pages/AdminDashboard";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/articles" element={<Articles />} />

                {/* Parent Routes */}
                <Route path="/parent">
                  <Route
                    index
                    element={<Navigate to="/parent/dashboard" replace />}
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['parent']}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Doctor Routes */}
                <Route path="/doctor">
                  <Route
                    index
                    element={<Navigate to="/doctor/dashboard" replace />}
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['doctor']}>
                        <DoctorDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="add-child"
                    element={
                      <ProtectedRoute allowedRoles={['doctor']}>
                        <AddChildToParent />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="requests/new"
                    element={
                      <ProtectedRoute allowedRoles={['doctor']}>
                        <NewRequest />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin">
                  <Route
                    index
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
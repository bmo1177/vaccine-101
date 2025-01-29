import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
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
                <Route index element={<Navigate to="/parent/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>

              {/* Doctor Routes */}
              <Route path="/doctor">
                <Route index element={<Navigate to="/doctor/dashboard" replace />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="add-child" element={<AddChildToParent />} />
                <Route path="requests/new" element={<NewRequest />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin">
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
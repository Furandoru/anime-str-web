import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Profile } from "./Pages/Home/Profile";
import { Settings } from "./Pages/Home/Settings";
import { About } from "./Pages/Home/About";
import AnimeDetail from "./Pages/Home/AnimeDetail";
import Genres from "./Pages/Home/Genres";
import Favorites from "./Pages/Home/Favorites";
import Search from "./Pages/Home/Search";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import MainLayout from './Pages/Layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import './App.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Public Main Pages */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/genres" element={<MainLayout><Genres /></MainLayout>} />
            <Route path="/anime/:id" element={<MainLayout><AnimeDetail /></MainLayout>} />

            {/* Protected Personal Pages */}
            <Route path="/favorites" element={<ProtectedRoute><MainLayout><Favorites /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
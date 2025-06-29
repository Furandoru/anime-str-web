import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Profile } from "./Pages/Home/Profile";
import { Settings } from "./Pages/Home/Settings";
import { About } from "./Pages/Home/About";
import AnimeDetail from "./Pages/Home/AnimeDetail";
import Genres from "./Pages/Home/Genres";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
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
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <MainLayout>
                  <About />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/genres" element={
              <ProtectedRoute>
                <MainLayout>
                  <Genres />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Favorites Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>History Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/anime/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <AnimeDetail />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
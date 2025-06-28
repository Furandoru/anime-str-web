import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Profile } from "./Pages/Home/Profile";
import { Settings } from "./Pages/Home/Settings";
import { About } from "./Pages/Home/About";
import AnimeDetail from "./Pages/Home/AnimeDetail";
import Genres from "./Pages/Home/Genres";
import MainLayout from './Pages/Layouts/MainLayout';
import { ThemeProvider } from './theme/ThemeProvider';
import './App.css'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/favorites" element={<div>Favorites Page (Coming Soon)</div>} />
            <Route path="/history" element={<div>History Page (Coming Soon)</div>} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            {/* Add more routes here as needed */}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
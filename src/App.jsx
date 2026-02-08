import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePost from './pages/SinglePost';
import ProfilDesa from './pages/ProfilDesa';
import Transparansi from './pages/Transparansi';
import BeritaSemua from './pages/BeritaSemua';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/berita/:slug" element={<SinglePost />} />
        <Route path="/berita/semua" element={<BeritaSemua />} />
        <Route path="/profil/:tab?" element={<ProfilDesa />} />
        <Route path="/transparansi" element={<Transparansi />} />
      </Routes>
    </Router>
  );
}

export default App;
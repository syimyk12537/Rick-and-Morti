import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Locations from './pages/Locations';
import Episodes from './pages/Episodes';
import CharacterDetails from './components/CharacterDetails';
import LocationDetails from './components/LocationDetails';
import EpisodeDetails from './components/EpisodeDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewClaim from './pages/NewClaim';
import Confirmation from './pages/Confirmation';
import Search from './components/Search';
import ClaimDetails from './pages/ClaimDetails'; // Importa el nuevo componente
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/new-claim">Reclamo</Link></li>
          <li><Link to="/search-claim">Buscar</Link></li>
        </ul>
      </nav>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-claim" element={<NewClaim />} />
          <Route path="/search-claim" element={<Search />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/claim/:id" element={<ClaimDetails />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

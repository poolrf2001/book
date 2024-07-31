import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`URL_DE_TU_API/buscar?term=${searchTerm}`);
      setResults(response.data);
    } catch (err) {
      setError('Error al realizar la búsqueda. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="search-container">
      <h1>Buscar Reclamos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por número de documento, nombre, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="results-container">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <Link to={`/claim/${result.id}`}>
              <h3>{result.title}</h3>
            </Link>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

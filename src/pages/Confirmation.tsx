import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation: React.FC = () => {
  return (
    <div className="confirmation-container">
      <h1>Reclamo Enviado</h1>
      <p>Su reclamo ha sido enviado exitosamente. Nos pondremos en contacto con usted pronto.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Confirmation;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ClaimDetails.css';

const ClaimDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [claim, setClaim] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const response = await axios.get(`URL_DE_TU_API/reclamaciones/${id}`);
        setClaim(response.data);
      } catch (err) {
        setError('Error al obtener los detalles de la reclamación. Por favor, intenta de nuevo.');
      }
    };

    fetchClaimDetails();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!claim) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="claim-details-container">
      <h1>Detalles de la Reclamación</h1>
      <p><strong>Tipo de Documento:</strong> {claim.documentType}</p>
      <p><strong>Número de Documento:</strong> {claim.documentNumber}</p>
      <p><strong>Nombres:</strong> {claim.firstName}</p>
      <p><strong>Apellidos:</strong> {claim.lastName}</p>
      <p><strong>Institución:</strong> {claim.institution}</p>
      <p><strong>Sede:</strong> {claim.location}</p>
      <p><strong>Fecha del Incidente:</strong> {claim.incidentDate}</p>
      <p><strong>Hora del Incidente:</strong> {claim.incidentTime}</p>
      <p><strong>Descripción:</strong> {claim.description}</p>
      {claim.file && (
        <p><strong>Archivo Adjunto:</strong> <a href={claim.fileUrl} download>Descargar</a></p>
      )}
    </div>
  );
};

export default ClaimDetails;

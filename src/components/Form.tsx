import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
  const [form, setForm] = useState({
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    institution: '',
    location: '',
    notPhysicalLocation: false,
    incidentDate: '',
    incidentTime: '',
    description: '',
    file: null as File | null,
  });

  const [errors, setErrors] = useState({
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    institution: '',
    location: '',
    incidentDate: '',
    incidentTime: '',
    description: '',
    file: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!form.documentType) {
      newErrors.documentType = 'Tipo de documento es requerido';
      isValid = false;
    }

    if (!form.documentNumber) {
      newErrors.documentNumber = 'Número de documento es requerido';
      isValid = false;
    }

    if (!form.firstName) {
      newErrors.firstName = 'Nombres son requeridos';
      isValid = false;
    }

    if (!form.lastName) {
      newErrors.lastName = 'Apellidos son requeridos';
      isValid = false;
    }

    if (!form.institution) {
      newErrors.institution = 'Institución es requerida';
      isValid = false;
    }

    if (!form.location && !form.notPhysicalLocation) {
      newErrors.location = 'Ubicación es requerida';
      isValid = false;
    }

    if (!form.incidentDate) {
      newErrors.incidentDate = 'Fecha del incidente es requerida';
      isValid = false;
    }

    if (!form.incidentTime) {
      newErrors.incidentTime = 'Hora del incidente es requerida';
      isValid = false;
    }

    if (!form.description) {
      newErrors.description = 'Descripción es requerida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === 'file') {
      const file = files?.[0];
      if (file) {
        if (file.size > 20 * 1024 * 1024) {
          setErrors({ ...errors, file: 'El archivo no debe exceder los 20 MB' });
          setForm({ ...form, file: null });
          return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'audio/mp3', 'video/mp4', 'application/pdf', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
          setErrors({ ...errors, file: 'Tipo de archivo no permitido' });
          setForm({ ...form, file: null });
          return;
        }

        setErrors({ ...errors, file: '' });
        setForm({ ...form, file });
      }
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          formData.append(key, value as any);
        });

        if (form.file) {
          formData.append('archivo', form.file);
        }

        await axios.post('http://localhost:3000/api/reclamaciones', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        navigate('/confirmation');
      } catch (error) {
        console.error('Error enviando el reclamo', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Nuevo Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="documentType">Tipo documento:</label>
          <select name="documentType" value={form.documentType} onChange={handleChange}>
            <option value="">Seleccione...</option>
            <option value="dni">DNI</option>
            <option value="passport">Pasaporte</option>
          </select>
          {errors.documentType && <div className="error">{errors.documentType}</div>}
        </div>
        <div>
          <label htmlFor="documentNumber">Número documento:</label>
          <input type="text" name="documentNumber" value={form.documentNumber} onChange={handleChange} />
          {errors.documentNumber && <div className="error">{errors.documentNumber}</div>}
        </div>
        <div>
          <label htmlFor="firstName">Nombres:</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName">Apellidos:</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor="institution">¿En qué entidad ocurrió la situación que origina tu reclamo?</label>
          <select name="institution" value={form.institution} onChange={handleChange}>
            <option value="">Seleccione institución...</option>
            <option value="institucion1">Institución 1</option>
            <option value="institucion2">Institución 2</option>
            <option value="institucion3">Institución 3</option>
            <option value="institucion4">Institución 4</option>
            <option value="institucion5">Institución 5</option>
          </select>
          {errors.institution && <div className="error">{errors.institution}</div>}
        </div>
        <div>
          <label htmlFor="location">¿En qué sede te encontrabas?</label>
          <select name="location" value={form.location} onChange={handleChange}>
            <option value="">Seleccione sede...</option>
            <option value="sede1">Sede 1</option>
            <option value="sede2">Sede 2</option>
            <option value="sede3">Sede 3</option>
            <option value="sede4">Sede 4</option>
            <option value="sede5">Sede 5</option>
          </select>
          <div>
            <input type="checkbox" name="notPhysicalLocation" checked={form.notPhysicalLocation} onChange={handleChange} />
            <label htmlFor="notPhysicalLocation">El problema no ocurrió en una sede física.</label>
          </div>
          {errors.location && <div className="error">{errors.location}</div>}
        </div>
        <div>
          <label htmlFor="incidentDate">¿Cuándo ocurrió la situación que origina el presente reclamo?</label>
          <input type="date" name="incidentDate" value={form.incidentDate} onChange={handleChange} />
          {errors.incidentDate && <div className="error">{errors.incidentDate}</div>}
        </div>
        <div>
          <label htmlFor="incidentTime">¿Aproximadamente a qué hora sucedió?</label>
          <input type="time" name="incidentTime" value={form.incidentTime} onChange={handleChange} />
          {errors.incidentTime && <div className="error">{errors.incidentTime}</div>}
        </div>
        <div>
          <label htmlFor="description">Describenos ¿qué sucedió?</label>
          <textarea name="description" value={form.description} onChange={handleChange} maxLength={4000} />
          <div>Quedan {4000 - form.description.length} caracteres.</div>
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div>
          <label htmlFor="file">Adjuntar archivos (opcional)</label>
          <input type="file" name="file" onChange={handleChange} />
          {errors.file && <div className="error">{errors.file}</div>}
          <div>Tipos de archivos permitidos: .jpg, .jpeg, .png, .mp3, .mp4, .pdf, .txt</div>
          <div>Límite máximo de 20 MB</div>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Form;

// src/axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // Asegúrate de que esta URL coincida con la de tu backend
});

export default instance;

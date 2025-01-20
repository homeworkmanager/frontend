import { BackendUrl } from '../constants/backendUrl';

import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: BackendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.defaults.withXSRFToken = true;

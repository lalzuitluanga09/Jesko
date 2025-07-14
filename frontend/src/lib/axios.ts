import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  withXSRFToken: true,
})

export const adminApi = axios.create({
  baseURL: 'http://localhost:8000/api/admin',
  withCredentials: true,
  withXSRFToken: true,
})
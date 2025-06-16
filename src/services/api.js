import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getBlogs = () => api.get('/blogs');
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data, token) =>
  api.post('/blogs', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

export const updateBlog = (id, data, token) =>
  api.put(`/blogs/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

export const deleteBlog = (id, token) =>
  api.delete(`/blogs/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

export const login = (credentials) => api.post('/login', credentials);
export const signup = (userInfo) => api.post('/register', userInfo);

export default api;

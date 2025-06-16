import axios from 'axios';
import { convertToBase64 } from '../utils/helper';

const API_URL = 'http://localhost:3000/blogs';

export const createBlog = async (blogData, token) => {
  try {
    const blogObject = {
      title: blogData.get('title'),
      content: blogData.get('content'),
    };

    const imageFile = blogData.get('image');
    if (imageFile && imageFile instanceof File) {
      blogObject.image = await convertToBase64(imageFile);
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    const response = await axios.post(API_URL, blogObject, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, blogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 
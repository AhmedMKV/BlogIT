import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, IconButton, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createBlog, updateBlog } from '../services/api';
import { convertToBase64 } from '../utils/helper';

const CreateBlogForm = ({ blog, mode = 'create' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (blog && mode === 'edit') {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        image: null,
      });
      if (blog.image) {
        setImagePreview(blog.image);
      }
    }
  }, [blog, mode]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB',
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    try {
      if (!token) {
        setSubmitError('You must be logged in to create a blog post');
        return;
      }

      let base64Image = null;
      if (formData.image) {
        base64Image = await convertToBase64(formData.image);
      }

     
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.id) {
        setSubmitError('User data not found. Please log in again.');
        return;
      }

      const dataToSend = {
        title: formData.title,
        content: formData.content,
        image: base64Image || blog?.image || null,
        userId: userData.id,  
        authorId: userData.id 
      };

      const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

      if (mode === 'edit' && blog?.id) {
        await updateBlog(blog.id, dataToSend, authToken);
        console.log('Blog updated successfully');
      } else {
        const response = await createBlog(dataToSend, authToken);
        console.log('Blog created successfully:', response.data);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error saving blog:', error);
      const errorMessage = error.response?.data?.error || error.response?.data || `Failed to ${mode} blog. Please try again.`;
      setSubmitError(errorMessage);

      if (error.response?.status === 401) {
        navigate('/AuthPage', { state: { from: mode === 'edit' ? `/edit/${blog?.id}` : '/create' } });
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3, 
        maxWidth: 600, 
        mx: 'auto',
      }}
    >
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        error={!!errors.title}
        helperText={errors.title}
          sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0,0,0,0.1)',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  }}
      />

      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        required
        error={!!errors.content}
        helperText={errors.content}
          sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0,0,0,0.1)',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            py: 1.5,
            borderStyle: 'dashed',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {errors.image && (
          <Typography color="error" variant="caption">
            {errors.image}
          </Typography>
        )}
        {imagePreview ? (
          <Box sx={{ position: 'relative', mt: 2 }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: theme.shape.borderRadius,
              }}
            />
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2,
              height: 200,
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 40 }} />
            <Typography variant="body2">
              Drag and drop an image here, or click to select
            </Typography>
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        sx={{
          mt: 2,
          py: 1.5,
          fontSize: '1.1rem',
          textTransform: 'none',
          boxShadow: theme.shadows[2],
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
      >
        {mode === 'edit' ? 'Update Blog' : 'Create Blog'}
      </Button>
    </Box>
  );
};

export default CreateBlogForm;

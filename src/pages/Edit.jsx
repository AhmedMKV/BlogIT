import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import CreateBlogForm from '../components/CreateBlogForm';
import { getBlogById } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Edit = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user) {
      navigate('/AuthPage', { state: { from: `/edit/${id}` } });
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        if (response.data) {
          if (response.data.authorId !== user.id) {
            setError('You are not authorized to edit this blog');
            return;
          }
          setBlog(response.data);
          setError(null);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError('You are not authorized to edit this blog');
        } else {
          setError('Failed to fetch blog. Please try again later.');
        }
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token, user, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography color="error">Blog not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Edit Blog
          </Typography>
          <CreateBlogForm blog={blog} mode="edit" />
        </Paper>
      </Container>
    </Box>
  );
};

export default Edit;

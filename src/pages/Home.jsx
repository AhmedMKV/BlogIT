import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import Blog from '../components/Blog';
import { useTheme } from '@mui/material/styles';
import { getBlogs } from '../services/blogService';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Welcome to BlogIT
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
            }}
          >
            Discover, share, and connect through the power of words
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {blogs.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ mt: 4 }}
              >
                No blogs found. Be the first to create one!
              </Typography>
            </Grid>
          ) : (
            blogs.map((blog) => (
              <Grid item xs={12} key={blog.id}>
                <Blog blog={blog} onDelete={handleDeleteBlog} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

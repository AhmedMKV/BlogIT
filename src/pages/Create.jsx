import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CreateBlogForm from '../components/CreateBlogForm';

const Create = () => {
  const theme = useTheme();

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
            Create New Blog
          </Typography>
          <CreateBlogForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default Create;

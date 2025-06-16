import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: "#2c3e50",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Your trusted source for insightful blog posts and engaging
              content.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/create" color="inherit" display="block" sx={{ mb: 1 }}>
              Create Post
            </Link>
            <Link href="/about" color="inherit" display="block">
              About
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: contact@blogit.com</Typography>
            <Typography variant="body2">Follow us on social media</Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} BlogIT. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import Navbar from "../Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;

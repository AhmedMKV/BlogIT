import React, { useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { useAuth } from "../contexts/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user && !location.state?.isLoggingIn && !location.state?.fromLogout) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [user, location.state, navigate]);

  React.useEffect(() => {
    if (location.state?.fromProtected) {
      setIsLogin(true);
    }
  }, [location.state]);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </Typography>

        {isLogin ? (
          <LoginForm switchToSignup={switchToSignup} />
        ) : (
          <SignupForm switchToLogin={switchToLogin} />
        )}
      </Paper>
    </Container>
  );
};

export default AuthPage;

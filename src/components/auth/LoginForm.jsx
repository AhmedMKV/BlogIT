import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Divider,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { login } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ email, password });
      const { accessToken, user } = response.data;

      
      authLogin(user, accessToken);

      
      const from = location.state?.from || "/";
      navigate(from, { replace: true, state: { isLoggingIn: false } });
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: { xs: 1, sm: 2 },
        py: 2,
      }}
    >
      <TextField
        label="Email Address"
        type="email"
        variant="outlined"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.1)",
            },
            "&:hover fieldset": {},
          },
        }}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.1)",
            },
            "&:hover fieldset": {},
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        />
        <Link href="#" underline="hover" color="primary" fontSize="0.875rem">
          Forgot password?
        </Link>
      </Box>

      {error && (
        <Typography color="error" fontSize="0.875rem" sx={{ mt: -1 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        fullWidth
        disabled={loading}
        sx={{
          borderRadius: 2,
          py: 1.4,
          fontWeight: 600,
          fontSize: "1rem",
          textTransform: "none",
          boxShadow: 3,
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: 6,
          },
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Typography variant="body2" align="center" color="text.secondary">
        Don&apos;t have an account?{" "}
        <Link
          component="button"
          onClick={switchToSignup}
          color="primary"
          fontWeight={600}
          underline="hover"
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;

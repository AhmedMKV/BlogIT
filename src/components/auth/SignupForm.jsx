import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Divider,
  Link,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { signup } from "../../services/api";

const SignupForm = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signup({ email, password, name });
      alert("Account created successfully! Please log in.");
      switchToLogin();
    } catch (err) {
      setError("Failed to create account. Please try again.");
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
        label="Full Name"
        type="text"
        variant="outlined"
        required
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
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
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Typography variant="body2" align="center" color="text.secondary">
        Already have an account?{" "}
        <Link
          component="button"
          onClick={switchToLogin}
          color="primary"
          fontWeight={600}
          underline="hover"
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;

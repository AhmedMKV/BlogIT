import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material/styles';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Create Blog', path: '/create' },
];

const settings = [
  { name: 'Auth', path: '/AuthPage' },
  { name: 'Logout', path: '/' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) navigate(path);
  };

  const handleCloseUserMenu = (path, settingName) => {
    setAnchorElUser(null);

    if (settingName === 'Logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
    backgroundColor: '#ffffff',
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid rgba(0,0,0,0.1)`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ArticleIcon sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            mr: 1,
            color: theme.palette.primary.main 
          }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              color: theme.palette.primary.main,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            BlogIT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <ArticleIcon sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            mr: 1,
            color: theme.palette.primary.main 
          }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              color: theme.palette.primary.main,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            BlogIT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ 
                  mx: 1,
                  color: theme.palette.text.primary,
                  display: 'block',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt="User Avatar" 
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleCloseUserMenu(setting.path, setting.name)}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

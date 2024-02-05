import * as React from 'react';
import { Container } from '@mui/system';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const options = ['Файл', 'Настройки', 'Терминал'];
const settings = ['Профиль', 'Выход'];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            LOGO
          </Typography>

          {/* Опции */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {options.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'white', display: 'block', p: 0, margin: 0, pl: 2 }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* Запуск задачи */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Tooltip title="Запуск задачи">
              <IconButton size="large" aria-label="Запуск задачи" color="inherit">
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Остановка задачи">
              <IconButton size="large" aria-label="Остановка задачи" color="inherit">
                <StopIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Кнопка профиля */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Открыть возможности">
              <Button color="inherit" variant="outlined" onClick={handleOpenUserMenu}>
                Профиль
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

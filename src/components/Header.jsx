import SideMenu from './SideMenu';
import { useState } from 'react';
import { Container } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const options = ['Настройки', 'Терминал'];
const fileFeatures = ['Создать файл', 'Открыть файл', 'Сохранить как'];
const accauntFeatures = ['Профиль', 'Выход'];

function Header() {
  const [isOpenUserFeatures, setOpenUserFeatures] = useState(null);
  const [isOpenFileFeatures, setOpenFileFeatures] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setOpenUserFeatures(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setOpenUserFeatures(null);
  };

  const handleOpenFileMenu = (event) => {
    setOpenFileFeatures(event.currentTarget);
  };
  const handleCloseFileMenu = () => {
    setOpenFileFeatures(null);
  };

  const handleOpenSideMenu = () => {
    setMenuOpen(true);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="x2">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenSideMenu}>
            <MenuIcon />
          </IconButton>

          {/* Кнопка файла */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <Button color="inherit" variant="text" onClick={handleOpenFileMenu}>
                Файл
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={isOpenFileFeatures}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(isOpenFileFeatures)}
              onClose={handleCloseFileMenu}>
              {fileFeatures.map((feature) => (
                <MenuItem key={feature} onClick={handleCloseFileMenu}>
                  <Typography textAlign="center">{feature}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

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
              anchorEl={isOpenUserFeatures}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(isOpenUserFeatures)}
              onClose={handleCloseUserMenu}>
              {accauntFeatures.map((feature) => (
                <MenuItem key={feature} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{feature}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <SideMenu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)} />
    </AppBar>
  );
}

export default Header;

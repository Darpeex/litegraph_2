import { useState } from 'react';
import { LGraph } from 'litegraph.js';
import { Container } from '@mui/system';
import { lightGreen } from '@mui/material/colors';
import SideMenuFunctions from './SideMenuFunctions';
import { Menu as MenuIcon, Stop as StopIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const options = ['Настройки', 'Терминал']; // опции верхней панели (AppBar) - далее будет понятно, что с ними делать, пока оставляю
const fileFeatures = ['Создать файл', 'Открыть файл', 'Сохранить как']; // возможности, выпадающие по кнопке Файла
const accauntFeatures = ['Профиль', 'Выход']; // возможности, выпадающие по кнопке Профиля

function Header({ graph }) {
  const [isOpenUserFeatures, setOpenUserFeatures] = useState(null); // открыто ли окно с возможностями Профиля
  const [isOpenFileFeatures, setOpenFileFeatures] = useState(null); // открыто ли окно с возможностями Файла
  const [isSideMenuFunctionsOpen, setSideMenuFunctionsOpen] = useState(false); // открыто ли боковое меню
  const [inProgress, setInProgress] = useState(false); // запущен ли процесс выполнения задачи

  // Открыть, закрыть список возможностей Профиля
  const handleOpenUserMenu = (event) => {
    setOpenUserFeatures(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setOpenUserFeatures(null);
  };

  // Открыть, закрыть список возможностей Файла
  const handleOpenFileMenu = (event) => {
    setOpenFileFeatures(event.currentTarget);
  };
  const handleCloseFileMenu = () => {
    setOpenFileFeatures(null);
  };

  // Открыть боковое меню (SideMenuFunctions)
  const handleOpenSideMenuFunctions = () => {
    setSideMenuFunctionsOpen(true);
  };

  // Запустить выполнение
  const handleStart = () => {
    graph.start(); // Запускаем график
    console.log('Start');
    setInProgress(true);
    LGraph.status = LGraph.STATUS_RUNNING; // 2
  };
  // Остановить выполнение
  const handleStop = () => {
    graph.stop();
    console.log('Stop');
    setInProgress(false);
    LGraph.status = LGraph.STATUS_STOPPED; // 1
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
            onClick={handleOpenSideMenuFunctions}>
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

          {/* Запуск и Остановка задачи */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Tooltip title="Запуск задачи">
              <IconButton size="large" aria-label="Запуск задачи" color="inherit" onClick={handleStart}>
                <PlayArrowIcon sx={{ color: inProgress ? lightGreen[500] : '' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Остановка задачи">
              <IconButton size="large" aria-label="Остановка задачи" color="inherit" onClick={handleStop}>
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
      <SideMenuFunctions menuOpen={isSideMenuFunctionsOpen} closeMenu={() => setSideMenuFunctionsOpen(false)} />
    </AppBar>
  );
}

export default Header;

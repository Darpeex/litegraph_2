import { useState } from 'react';
import { LGraph } from 'litegraph.js';
import { Container } from '@mui/system';
import { lightGreen } from '@mui/material/colors';
import SideMenuFunctions from './SideMenuFunctions';
import {
  Menu as MenuIcon,
  Stop as StopIcon,
  OpenWith as OpenWithIcon,
  PlayArrow as PlayArrowIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const options = ['Настройки', 'Терминал']; // опции верхней панели (AppBar)
const fileFeatures = ['Открыть файл', 'Сохранить файл']; // возможности, выпадающие по кнопке Файла
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
    graph.start(); // Запускаем выполнение графика
    console.log('Start');
    setInProgress(true);
    LGraph.status = LGraph.STATUS_RUNNING; // 2
  };
  // Остановить выполнение
  const handleStop = () => {
    graph.stop(); // Останавливаем выполнение графика
    console.log('Stop');
    setInProgress(false);
    LGraph.status = LGraph.STATUS_STOPPED; // 1
  };

  // Сохранить схему в localStorage
  function saveGraph() {
    const data = graph.serialize();
    const jsonStr = JSON.stringify(data);
    localStorage.setItem('graphData', jsonStr);
  }
  // Загрузить схему из localStorage
  function loadGraph() {
    const data = localStorage.getItem('graphData');
    if (data) {
      graph.configure(JSON.parse(data));
    }
  }
  // Очистить граф
  function clearGraph() {
    graph.clear();
  }
  // Позиционирует график более удобочитаемым образом
  function arrangeGraph() {
    graph.arrange(100);
  }

  // Скачать схему
  function downloadGraph() {
    const data = graph.serialize();
    const jsonStr = JSON.stringify(data);
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'graph.json';
    link.click();
  }
  // Открыть JSON файл
  const handleOpenFile = () => {
    // создали элемент 'input' и присвоили полю тип 'file'
    const input = document.createElement('input');
    input.type = 'file';

    input.click(); // открытие диалогового окна для выбора файла

    // когда пользователь выбрал файл - 'onchange'
    input.onchange = (e) => {
      const file = e.target.files[0]; // выбранный файл со своими свойствами
      const reader = new FileReader(); // объект c методами обработки данных

      reader.readAsText(file); // прочитать содержимое файла как текст
      reader.onload = function () {
        // преобразовываем JSON и выводим график
        graph.configure(JSON.parse(reader.result));
        console.log(reader.result);
      };
      // если ошибка, сообщаем в консоли
      reader.onerror = function () {
        console.log(reader.error);
      };
    };
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
                <MenuItem
                  key={feature}
                  onClick={() => {
                    if (feature === 'Открыть файл') {
                      handleOpenFile();
                      handleCloseFileMenu();
                    }
                    if (feature === 'Сохранить файл') {
                      downloadGraph();
                      handleCloseFileMenu();
                    } else {
                      handleCloseFileMenu();
                    }
                  }}>
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

          {/* Сохранение, выгрузка в localStorage и скачивание JSON файла */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            <Tooltip title="Очистить схему">
              <IconButton size="large" aria-label="Очистить схему" color="inherit" onClick={clearGraph}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Упорядочить узлы">
              <IconButton size="large" aria-label="Упорядочить узлы" color="inherit" onClick={arrangeGraph}>
                <OpenWithIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Сохранить схему">
              <IconButton size="large" aria-label="Сохранить схему" color="inherit" onClick={saveGraph}>
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Загрузить схему">
              <IconButton size="large" aria-label="Загрузить схему" color="inherit" onClick={loadGraph}>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
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

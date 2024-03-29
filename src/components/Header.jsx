import { useState } from 'react';
import { LGraph } from 'litegraph.js';
import { Container } from '@mui/system';
import { lightGreen } from '@mui/material/colors';
import SideMenuFunctions from './SideMenuFunctions';
import {
  Menu as MenuIcon,
  Stop as StopIcon,
  OpenWith as OpenWithIcon,
  SkipNext as SkipNextIcon,
  PlayArrow as PlayArrowIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  DeleteForever as DeleteForeverIcon,
  FilterCenterFocus as FilterCenterFocusIcon,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const options = ['Настройки', 'Терминал']; // опции верхней панели (AppBar)
const fileFeatures = ['Открыть файл', 'Сохранить файл']; // возможности, выпадающие по кнопке Файла
const accauntFeatures = ['Профиль', 'Выход']; // возможности, выпадающие по кнопке Профиля

function Header({ graph, canvas }) {
  const [isOpenUserFeatures, setOpenUserFeatures] = useState(null); // открыто ли окно с возможностями Профиля
  const [isOpenFileFeatures, setOpenFileFeatures] = useState(null); // открыто ли окно с возможностями Файла
  const [isSideMenuFunctionsOpen, setSideMenuFunctionsOpen] = useState(false); // открыто ли боковое меню
  const [inProgress, setInProgress] = useState(false); // запущен ли процесс выполнения задачи
  let shouldExecute = true; // переменная для контроля выполнения
  let nodes = graph._nodes_in_order; // все узлы графа

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

  // Выполнение узлов поочереди с анимациями
  const executeNodesInOrder = async (_, currentIndex = 0) => {
    if (nodes.length === 0) {
      graph.change();
      nodes = graph._nodes_in_order;
    } // обновляем массив nodes, если он пуст
    if (!shouldExecute) {
      return;
    } // если переменная false - останавливаем
    if (currentIndex >= nodes.length) {
      nodes.map((node) => (node.boxcolor = '#222'));
      return;
    } // когда все узлы выполнены
    const node = nodes[currentIndex];
    const nodeInterval = node.properties.interval;

    const intervalId = setInterval(() => {
      node.boxcolor = node.boxcolor === '#222' ? '#F8D568' : '#222';
      console.log('цвет изменён');
      graph.change(); // обновляем, чтобы отобразилось изменение цвета
    }, 600); // период изменения в мс

    // Задержка перед следующим узлом
    await new Promise((resolve) => setTimeout(resolve, nodeInterval));
    clearInterval(intervalId); // очищаем интервал после выполнения узла
    if (node && node.outputs) {
      node.trigger(node.outputs.name, node.properties.event);
      if (node.inputs && node.inputs.length > 1 && node.inputs[1]) {
        node.setOutputData(1, true);
      }
    } // на выходе EVENT срабатывает trigger анимируя связь
    node.boxcolor = '#222'; // сбрасываем цвет
    graph.change(); // обновляем график
    // Выполняем следующий узел
    await executeNodesInOrder(nodes, currentIndex + 1);
  };

  // Поэтапное выполнение узлов
  const handleStepByStep = () => {
    shouldExecute = true; // Устанавливаем переменную в true перед запуском
    executeNodesInOrder();
    console.log('Step');
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
    shouldExecute = false; // Устанавливаем переменную в false для остановки
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

          {/* Функциональные кнопки */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            <Tooltip title="Очистить схему">
              <IconButton size="large" aria-label="Очистить схему" color="inherit" onClick={() => graph.clear()}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Упорядочить узлы">
              <IconButton size="large" aria-label="Упорядочить узлы" color="inherit" onClick={() => graph.arrange(100)}>
                <OpenWithIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Фокус на центр">
              <IconButton
                size="large"
                aria-label="Фокус на центр"
                color="inherit"
                onClick={() => {
                  canvas.ds.offset[0] = 0;
                  canvas.ds.offset[1] = 0;
                  canvas.ds.scale = 1;
                  graph.change();
                }}>
                <FilterCenterFocusIcon />
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
            <Tooltip title="Запуск по шагам">
              <IconButton size="large" aria-label="Запуск по шагам" color="inherit" onClick={handleStepByStep}>
                <SkipNextIcon />
              </IconButton>
            </Tooltip>
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

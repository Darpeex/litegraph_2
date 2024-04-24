import { useState } from 'react';
import { LGraph } from 'litegraph.js';
import { Container } from '@mui/system';
import { lightGreen } from '@mui/material/colors';
import { handleMountStartBlock } from './nodes/functions';
import { mainApi } from '../utils/MainApi'; // Запросы на сервер
import {
  Stop as StopIcon,
  OpenWith as OpenWithIcon,
  SkipNext as SkipNextIcon,
  PlayArrow as PlayArrowIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  DeleteForever as DeleteForeverIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  FilterCenterFocus as FilterCenterFocusIcon,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, Box, Menu, Tooltip, MenuItem, IconButton } from '@mui/material';

const SCHEME_LIST = 'Список схем';
const SAVE_SCHEME = 'Сохранить схему';

const options = ['Настройки']; // опции верхней панели (AppBar)
const fileFeatures = [SCHEME_LIST, SAVE_SCHEME]; // возможности, выпадающие по кнопке Файла

function Header({
  graph,
  canvas,
  setSchemesFromDB,
  onNodeDeselected,
  setOpenModalSchemeList,
  setOpenModalSaveSchemeForm,
}) {
  const [isOpenFileFeatures, setOpenFileFeatures] = useState(null); // открыто ли окно с возможностями Файла
  const [inProgress, setInProgress] = useState(false); // запущен ли процесс выполнения задачи
  let shouldExecute = true; // переменная для контроля выполнения
  let nodes = graph._nodes_in_order; // все блоки графа

  // Открыть, закрыть список возможностей Файла
  const handleOpenFileMenu = (event) => {
    setOpenFileFeatures(event.currentTarget);
  };
  const handleCloseFileMenu = () => {
    setOpenFileFeatures(null);
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
    } // когда все блоки выполнены
    const node = nodes[currentIndex];
    const nodeInterval = node.properties.interval;

    const intervalId = setInterval(() => {
      node.boxcolor = node.boxcolor === '#222' ? '#F8D568' : '#222';
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

  return (
    <AppBar position="fixed">
      <Container maxWidth="x2">
        <Toolbar disableGutters>
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
                    if (feature === SCHEME_LIST) {
                      mainApi.getSchemes().then((schemes) => {
                        setSchemesFromDB(schemes);
                        handleCloseFileMenu();
                        setOpenModalSchemeList(true);
                      });
                    }
                    if (feature === SAVE_SCHEME) {
                      handleCloseFileMenu();
                      setOpenModalSaveSchemeForm(true);
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
              <IconButton
                size="large"
                aria-label="Очистить схему"
                color="inherit"
                onClick={() => {
                  graph.clear();
                  onNodeDeselected();
                }}>
                <DeleteForeverIcon />
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
            <Tooltip title="Упорядочить блоки">
              <IconButton
                size="large"
                aria-label="Упорядочить блоки"
                color="inherit"
                onClick={() => graph.arrange(100)}>
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
            <Tooltip title="Добавить блок">
              <IconButton size="large" aria-label="Добавить блок" color="inherit" onClick={handleMountStartBlock}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Запуск и Остановка задачи */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

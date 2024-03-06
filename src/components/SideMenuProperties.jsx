import React, { useEffect, useState, useRef } from 'react';
import { PATH_TO_DIR, PATH_TO_FILE } from '../constants/constants';
import {
  Box,
  List,
  Drawer,
  Divider,
  Tooltip,
  ListItem,
  Collapse,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  FormControlLabel,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Tune as TuneIcon,
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';

const SideMenuProperties = ({ node, menuOpen }) => {
  const [outputPorts, setOutputPorts] = useState([]);
  const inputRef = useRef(null);
  // Ссылка на элемент ввода для каждого порта
  const [inputRefs, setInputRefs] = useState(node && node.inputs ? node.inputs.map(() => React.createRef()) : []);
  // Состояние каждого подменю
  const [openSubMenus, setOpenSubMenus] = useState([false, false]);
  // Счётчики для портов
  const [inputCounter, setInputCounter] = useState(0);
  const [outputCounter, setOutputCounter] = useState(0);
  // Отрисовка портов при обновлении массивов node.inputs/outputs
  const [toggle, setToggle] = useState(true);
  // Состояния Свойств Узла
  const [nodeTitle, setNodeTitle] = useState(node ? node.title : 'узел не выбран');
  const [nodePathToWorkDir, setNodePathToWorkDir] = useState(
    node && node.properties ? node.properties.workDir : PATH_TO_DIR,
  );
  const [nodePathToBinaryFile, setNodePathToBinaryFile] = useState(
    node && node.properties ? node.properties.binaryFile : PATH_TO_FILE,
  );
  const [nodeCores, setNodeCores] = useState(node && node.properties ? node.properties.cores : '');
  const [nodeFlags, setNodeFlags] = useState(node && node.properties ? node.properties.flags : '');
  const [checkbox, setCheckbox] = useState(node && node.properties ? node.properties.checkbox : false);
  // Состояния Свойств Выходных портов
  const [outputTitlesArr, setOutputTitlesArr] = useState([]);
  const [outputPathToWorkDir, setOutputPathToWorkDir] = useState(
    node && node.properties ? node.properties.workDir : PATH_TO_DIR,
  );
  const [outputPathToBinaryFile, setOutputPathToBinaryFile] = useState(
    node && node.properties ? node.properties.binaryFile : PATH_TO_FILE,
  );
  const [outputCores, setOutputCores] = useState(node && node.properties ? node.properties.cores : '');
  const [outputFlags, setOutputFlags] = useState(node && node.properties ? node.properties.flags : '');
  // Определение порта, у которого меняем свойства
  console.log(outputPorts);

  // Свойства узлов и портов
  const properties = {
    name: 'Свойства',
    nodeProps: [
      { id: 'nodeTitle', label: 'Имя блока', type: 'string', setState: setNodeTitle, value: nodeTitle },
      {
        id: 'nodeWorkDir',
        label: 'Рабочая директория',
        type: 'string',
        setState: setNodePathToWorkDir,
        value: nodePathToWorkDir,
      },
      {
        id: 'nodeBinaryFile',
        label: 'Путь к бинарному файлу',
        type: 'string',
        setState: setNodePathToBinaryFile,
        value: nodePathToBinaryFile,
      },
      { id: 'nodeCores', label: 'Количество ядер', type: 'number', setState: setNodeCores, value: nodeCores },
      { id: 'nodeFlags', label: 'Аргументы/Флаги', type: 'string', setState: setNodeFlags, value: nodeFlags },
    ],
    outputProps: [
      {
        id: 'name',
        label: 'Имя порта',
        type: 'string',
        setState: setOutputTitlesArr,
        value: outputTitlesArr,
      },
      {
        id: 'workDir',
        label: 'Рабочая директория',
        type: 'string',
        setState: setOutputPathToWorkDir,
        value: outputPathToWorkDir,
      },
      {
        id: 'binaryFile',
        label: 'Путь к бинарному файлу',
        type: 'string',
        setState: setOutputPathToBinaryFile,
        value: outputPathToBinaryFile,
      },
      { id: 'cores', label: 'Количество ядер', type: 'number', setState: setOutputCores, value: outputCores },
      { id: 'flags', label: 'Аргументы/Флаги', type: 'string', setState: setOutputFlags, value: outputFlags },
    ],
  };

  // ВЫНЕСТИ ПОТОМ из SideMenu'шек в константу
  // Обновляем обработчик, чтобы он принимал индекс нажатого подменю
  const handleClick = (index) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      // Создаем новую копию состояния массива
      const newOpenSubMenus = [...prevOpenSubMenus];
      // Переключаем состояние конкретного подменю
      newOpenSubMenus[index] = !newOpenSubMenus[index];
      return newOpenSubMenus;
    });
  };

  // При открытии свойств нового узла, данные обновляются на сохраненные в узле
  useEffect(() => {
    if (node && node.properties) {
      setNodeTitle(node.title);
      setNodePathToWorkDir(node.properties.workDir);
      setNodePathToBinaryFile(node.properties.binaryFile);
      setNodeCores(node.properties.cores);
      setNodeFlags(node.properties.flags);
      setCheckbox(node.properties.checkbox);
      if (node.properties.checkbox === true) {
        node.order = 1;
      } else {
        node.order;
      }
      // Свойства выходных портов
      if (node.outputs) {
        const outputsTitles = node.outputs.map((element) => element.name);
        setOutputTitlesArr(outputsTitles);
      }
      if (node && node.outputs) {
        console.log(node.outputs);
        setOutputPorts(node.outputs);
      }
    }
  }, [node]);

  // Сохранение свойств узла и закрытие SideMenuProperties
  const handleChangeNodeProperties = () => {
    // переименование блока в свойствах
    node.getTitle = function () {
      if (node) {
        node.title = nodeTitle;
        return nodeTitle;
      }
      return 'Ошибка';
    };
    node.setProperty('workDir', nodePathToWorkDir);
    node.setProperty('binaryFile', nodePathToBinaryFile);
    node.setProperty('cores', nodeCores);
    node.setProperty('flags', nodeFlags);
    node.setProperty('checkbox', checkbox);
    if (checkbox === true) {
      node.order = 1;
    } else {
      node.order;
    }
  };

  // Добавить входной порт
  const handleAddInput = () => {
    const newInputId = inputCounter + 1;
    setInputCounter(newInputId);

    node.addInput(`Вход ${newInputId}`);
    // Обновляем массив ссылок, добавляя новую ссылку
    setInputRefs((prevRefs) => [...prevRefs, React.createRef()]);
    setToggle(!toggle);
  };
  // Удалить входной порт
  const handleRemoveInput = (inputIndex) => {
    node.removeInput(inputIndex);
    setToggle(!toggle);
  };
  // Функция для обновления имени входного порта и установки фокуса
  const handleInputNameChange = (input, newName) => {
    input.name = newName;
    // Установите фокус обратно на элемент ввода после его обновления
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setToggle(!toggle); // Принудительное обновление интерфейса
  };

  // Добавить выходной порт
  const handleAddOutput = () => {
    const newOutputId = outputCounter + 1;
    setOutputCounter(newOutputId);

    const newOutput = {
      id: newOutputId,
      name: `Выход ${newOutputId}`,
      workDir: '',
      binaryFile: '',
      cores: '',
      flags: '',
    };
    // Проверяем, существует ли узел node и свойство outputs, и если нет, инициализируем его как пустой массив
    node.addOutput(newOutput.name);
    // Добавляем новый порт в node.outputs
    const updatedOutputs = node.outputs.map((output) => {
      if (output.name === newOutput.name) {
        Object.assign(output, newOutput);
      }
      return output;
    });
    // Обновляем состояние outputPorts
    setOutputPorts(updatedOutputs);
    // Добавляем false в openSubMenus для нового порта
    setOpenSubMenus([...openSubMenus, false]);
    setToggle(!toggle);
  };
  // Удалить выходной порт
  const handleRemoveOutput = (outputIndex) => {
    node.removeOutput(outputIndex);
    // Обновляем состояние outputPorts
    setOutputPorts(outputPorts.filter((_, index) => index !== outputIndex));
    // Удаляем флаг для удаленного порта из openSubMenus
    setOpenSubMenus(openSubMenus.filter((_, index) => index !== outputIndex));
    setToggle(!toggle);
  };
  // Функция выбора узла для установления её выходных портов
  // const handleOutputPortsSet = () => {
  //   if (node && node.outputs) {
  //     console.log(`1 - ${node.outputs}`);
  //     setOutputPorts(node.outputs);
  //   }
  // };
  // Функция для обновления свойств конкретного выходного порта
  const handleOutputPropertyChange = (outputId, property, newValue) => {
    setOutputPorts((prevPorts) =>
      prevPorts.map((port) => {
        console.log(port);
        if (port.id === outputId) {
          const updatedPort = { ...port, [property]: newValue };
          // Обновляем свойство в node.outputs
          const nodeOutput = node.outputs.find((output) => output.id === outputId);
          if (nodeOutput) {
            nodeOutput[property] = newValue;
          }
          return updatedPort;
        }
        return port;
      }),
    );
  };

  return (
    <Drawer anchor="right" open={menuOpen} variant="persistent" onBlur={handleChangeNodeProperties}>
      <List sx={{ width: '370px' }}>
        <ListItem>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary={`Свойства узла «${node ? node.title : 'узел не выбран'}»`} />
        </ListItem>
        <Divider />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '352px' },
          }}
          noValidate
          autoComplete="off">
          <div>
            {properties.nodeProps.map((prop, index) => (
              <TextField
                key={prop + index}
                id={prop.id}
                label={prop.label}
                type={prop.type}
                onChange={function (evt) {
                  const newValue = evt.target.value;
                  prop.setState(newValue);
                }}
                value={prop.value}
                variant="standard"
              />
            ))}
            <FormControlLabel
              color="main"
              sx={{ m: 1, width: '332px', justifyContent: 'start' }}
              control={<Checkbox checked={checkbox} onClick={() => setCheckbox(!checkbox)} />}
              label="Запускать сразу"
              labelPlacement="start"
            />
          </div>
        </Box>
      </List>
      <Divider />
      {/* Входные порты */}
      <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
        <Typography textAlign="center" sx={{ p: 1, pr: 0 }}>
          Входные порты
        </Typography>
        <Tooltip title="Добавить входной порт">
          <IconButton color="primary" aria-label="add input" onClick={handleAddInput}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {node &&
        node.inputs &&
        node.inputs.length > 0 &&
        node.inputs.map((input, index) => (
          <Box key={index} sx={{ m: 1, display: { xs: 'none', md: 'flex' } }}>
            <TextField
              type="string"
              onChange={(evt) => {
                const newValue = evt.target.value;
                handleInputNameChange(input, newValue, index);
              }}
              value={input.name}
              variant="standard"
              sx={{ flexGrow: 1, pr: 1 }}
              InputProps={{ disableUnderline: true }}
              inputRef={inputRefs[index]} // ссылка на элемент ввода
            />
            <IconButton
              color="primary"
              aria-label="remove input"
              sx={{ p: 0 }}
              onClick={() => handleRemoveInput(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      <Divider />
      {/* Выходные порты */}
      <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
        <Typography textAlign="center" sx={{ p: 1, pr: 0 }}>
          Выходные порты
        </Typography>
        <Tooltip title="Добавить выходной порт">
          <IconButton color="primary" aria-label="add output" onClick={handleAddOutput}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {node &&
        node.outputs &&
        node.outputs.length > 0 &&
        node.outputs.map((output, outputIndex) => (
          <Box key={outputIndex} sx={{ m: 1, display: { xs: 'none', md: 'flex', flexDirection: 'column' } }}>
            <Box key={outputIndex} sx={{ m: 0, display: { xs: 'none', md: 'flex' } }}>
              <ListItemButton sx={{ p: 0 }} onClick={() => handleClick(outputIndex)}>
                <ListItemText primary={output.name} sx={{ maxWidth: '320px', overflowWrap: 'break-word' }} />
                {openSubMenus[outputIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <IconButton
                color="primary"
                aria-label="remove output"
                sx={{ p: 0 }}
                onClick={() => handleRemoveOutput(outputIndex)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Collapse in={openSubMenus[outputIndex]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 2, width: '352px' }}>
                {properties.outputProps.map((prop, index) => (
                  <TextField
                    key={prop + index}
                    id={prop.id}
                    label={prop.label}
                    type={prop.type}
                    onChange={function (evt) {
                      const newValue = evt.target.value;
                      handleOutputPropertyChange(output.id, prop.id, newValue);
                    }}
                    value={outputPorts.find((port) => port.id === output.id)?.[prop.id] || ''}
                    variant="standard"
                    sx={{ mt: 1, width: '100%' }}
                  />
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
    </Drawer>
  );
};

// React.memo - чтобы предотвратить ненужные ререндеры
// так компонент перерисовывается, когда его пропсы изменяются.
export default React.memo(SideMenuProperties);

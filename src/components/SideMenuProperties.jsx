import React, { useEffect, useState } from 'react';
import { PATH_TO_DIR, PATH_TO_FILE } from '../constants/constants';
import {
  Box,
  List,
  Button,
  Drawer,
  Divider,
  Tooltip,
  ListItem,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
} from '@mui/material';
import { Tune as TuneIcon, AddCircleOutline as AddCircleOutlineIcon, Delete as DeleteIcon } from '@mui/icons-material';

const SideMenuProperties = ({ menuOpen, closeMenu, node }) => {
  const [inputCounter, setInputCounter] = useState(0);
  const [toggle, setToggle] = useState(true); // для отрисовки портов в SideBar при обновлении массива node.inputs
  const [title, setTitle] = useState(node ? node.title : 'узел не выбран');
  const [pathToWorkDir, setPathToWorkDir] = useState(node ? node.properties.workDir : PATH_TO_DIR);
  const [pathToBinaryFile, setPathToBinaryFile] = useState(node ? node.properties.binaryFile : PATH_TO_FILE);
  const [coresNumber, setCoresNumber] = useState(node ? node.properties.cores : '');
  const [slurmFlags, setSlurmFlags] = useState(node ? node.properties.flags : '');
  const [checkbox, setCheckbox] = useState(node ? node.properties.checkbox : false);

  // Свойства узла
  const properties = {
    name: 'Свойства',
    props: [
      { id: 'title', label: 'Имя блока', type: 'string', setState: setTitle, value: title },
      { id: 'workDir', label: 'Рабочая директория', type: 'string', setState: setPathToWorkDir, value: pathToWorkDir },
      {
        id: 'binaryFile',
        label: 'Путь к бинарному файлу',
        type: 'string',
        setState: setPathToBinaryFile,
        value: pathToBinaryFile,
      },
      { id: 'cores', label: 'Количество ядер', type: 'number', setState: setCoresNumber, value: coresNumber },
      { id: 'flags', label: 'Аргументы/Флаги', type: 'string', setState: setSlurmFlags, value: slurmFlags },
    ],
  };

  // При открытии свойств нового узла, данные обновляются на сохраненные в узле
  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setPathToWorkDir(node.properties.workDir);
      setPathToBinaryFile(node.properties.binaryFile);
      setCoresNumber(node.properties.cores);
      setSlurmFlags(node.properties.flags);
      setCheckbox(node.properties.checkbox);
      if (node.properties.checkbox === true) {
        node.order = 1;
      } else {
        node.order;
      }
    }
  }, [node]);

  // Сохранение свойств узла и закрытие SideMenuProperties
  const handleSave = () => {
    // переименование блока в свойствах
    node.getTitle = function () {
      if (node) {
        node.title = title;
        return title;
      }
      return 'Ошибка';
    };
    node.setProperty('workDir', pathToWorkDir);
    node.setProperty('binaryFile', pathToBinaryFile);
    node.setProperty('cores', coresNumber);
    node.setProperty('flags', slurmFlags);
    node.setProperty('checkbox', checkbox);
    if (checkbox === true) {
      node.order = 1;
    } else {
      node.order;
    }
    closeMenu();
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
  // Создайте ссылку на элемент ввода для каждого входного порта
  const [inputRefs, setInputRefs] = useState(node && node.inputs ? node.inputs.map(() => React.createRef()) : []);
  // Функция для обновления имени входного порта и установки фокуса
  const handleInputNameChange = (input, newName, index) => {
    input.name = newName;
    // Установите фокус обратно на элемент ввода после его обновления
    inputRefs[index].current.focus();
    setToggle(!toggle); // Принудительное обновление интерфейса
  };

  // Добавить выходной порт
  const handleAddOutput = () => {};

  return (
    <Drawer anchor="right" open={menuOpen} variant="persistent">
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
            {properties.props.map((prop, index) => (
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
              control={<Checkbox checked={checkbox} onChange={() => setCheckbox(!checkbox)} />}
              label="Запускать сразу"
              labelPlacement="start"
            />
          </div>
        </Box>
      </List>
      <Divider />
      {/* Входные порты */}
      <Box sx={{ mt: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
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
      <Typography textAlign="center" sx={{ mt: 1 }}>
        Выходные порты
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
        <Tooltip title="Добавить выходной порт">
          <IconButton color="primary" aria-label="add output" onClick={handleAddOutput}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Button sx={{ m: 1 }} variant="contained" onClick={handleSave}>
        Сохранить
      </Button>
    </Drawer>
  );
};

// React.memo - чтобы предотвратить ненужные ререндеры
// так компонент перерисовывается, когда его пропсы изменяются.
export default React.memo(SideMenuProperties);

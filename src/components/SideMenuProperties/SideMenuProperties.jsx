import React, { useEffect, useState } from 'react';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';
import { Tune as TuneIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  List,
  Drawer,
  Divider,
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
} from '@mui/material';
import InputsPorts from './InputsPorts';
import OutputsPorts from './OutputsPorts';

const SideMenuProperties = ({ canvas, node, menuOpen, toggle, setToggle }) => {
  const [nodeTitle, setNodeTitle] = useState(node ? node.title : 'узел не выбран'); // имя узла
  const [nodePathToWorkDir, setNodePathToWorkDir] = useState(
    node && node.properties ? node.properties.workDir : PATH_TO_DIR,
  ); // путь к рабочей директории

  const [nodePathToBinaryFile, setNodePathToBinaryFile] = useState(
    node && node.properties ? node.properties.binaryFile : PATH_TO_FILE,
  ); // путь к бинарному файлу
  const [nodeInterval, setNodeInterval] = useState(node && node.properties ? node.properties.interval : ''); // интервал
  const [nodeCores, setNodeCores] = useState(node && node.properties ? node.properties.cores : ''); // количество ядер
  const [nodeFlags, setNodeFlags] = useState(node && node.properties ? node.properties.flags : ''); // флаги/аргументы
  const [checkbox, setCheckbox] = useState(node && node.properties ? node.properties.checkbox : false); // чекбокс

  // Свойства узла
  const nodeProperties = [
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
    { id: 'nodeInterval', label: 'Время выполнения', type: 'number', setState: setNodeInterval, value: nodeInterval },
  ];

  // При открытии свойств нового узла, данные обновляются на ранее сохраненные в нём
  useEffect(() => {
    if (node && node.properties) {
      setNodeTitle(node.title);
      setNodePathToWorkDir(node.properties.workDir);
      setNodePathToBinaryFile(node.properties.binaryFile);
      setNodeCores(node.properties.cores);
      setNodeFlags(node.properties.flags);
      setNodeInterval(node.last_interval ? node.last_interval : node.properties.interval);
      setCheckbox(node.properties.checkbox);
      if (node.properties.checkbox === true) {
        node.order = 1;
      } else {
        node.order;
      }
    }
  }, [node]);

  // Обновление свойств узла при onBlur
  const handleChangeNodeProperties = () => {
    if (node) {
      node.getTitle = function () {
        node.title = nodeTitle;
        // обновление размеров узла
        const newSize = node.computeSize();
        node.size = [newSize[0], newSize[1]];
        return nodeTitle;
      }; // переименование блока в свойствах
      node.setProperty('workDir', nodePathToWorkDir);
      node.setProperty('binaryFile', nodePathToBinaryFile);
      node.setProperty('interval', nodeInterval);
      node.setProperty('cores', nodeCores);
      node.setProperty('flags', nodeFlags);
      node.setProperty('checkbox', checkbox);
      // изменение порядка выполнения
      if (checkbox === true) {
        node.order = 1;
      } else {
        node.order;
      }
    }
    return 'Ошибка';
  };

  return (
    <Drawer anchor="right" open={menuOpen} variant="persistent" onBlur={handleChangeNodeProperties}>
      <List sx={{ width: '370px' }}>
        <ListItem>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary={`Свойства узла «${node ? node.title : 'узел не выбран'}»`} />
          <IconButton
            color="primary"
            aria-label="remove input"
            sx={{ p: 0 }}
            onClick={() => canvas.deleteSelectedNodes()}>
            <DeleteIcon />
          </IconButton>
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
            {nodeProperties.map((prop, index) => (
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
      <InputsPorts node={node} toggle={toggle} setToggle={setToggle} /> {/* входные порты */}
      <Divider />
      <OutputsPorts node={node} toggle={toggle} setToggle={setToggle} /> {/* выходные порты */}
    </Drawer>
  );
};

// React.memo - чтобы предотвратить ненужные ререндеры
// так компонент перерисовывается, когда его пропсы изменяются.
export default React.memo(SideMenuProperties);

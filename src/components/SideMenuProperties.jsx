import React, { useEffect, useState } from 'react';
import { PATH_TO_DIR, PATH_TO_FILE } from '../constants/constants';
import {
  Box,
  List,
  Button,
  Drawer,
  Divider,
  ListItem,
  Checkbox,
  TextField,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
} from '@mui/material';
import { Tune as TuneIcon } from '@mui/icons-material';

const SideMenuProperties = ({ menuOpen, closeMenu, node }) => {
  const [pathToWorkDir, setpathToWorkDir] = useState(node ? node.properties.workDir : PATH_TO_DIR);
  const [pathToBinaryFile, setPathToBinaryFile] = useState(node ? node.properties.binaryFile : PATH_TO_FILE);
  const [coresNumber, setCoresNumber] = useState(node ? node.properties.cores : '');
  const [slurmFlags, setSlurmFlags] = useState(node ? node.properties.flags : '');
  const [checkbox, setCheckbox] = useState(node ? node.properties.checkbox : false);

  // При открытии свойств нового узла данные обновляются на сохраненные в узле
  useEffect(() => {
    if (node) {
      setpathToWorkDir(node.properties.workDir);
      setPathToBinaryFile(node.properties.binaryFile);
      setCoresNumber(node.properties.cores);
      setSlurmFlags(node.properties.flags);
      setCheckbox(node.properties.checkbox);
      if (node.properties.checkbox === true) {
        console.log('love');
        node.setProperty('order', 1);
      } else {
        node.setProperty('order', node.order);
      }
    }
  }, [node]);

  // Вызов функции отрисовки блока и закрытие SideMenuProperties
  const handleSave = () => {
    console.log('saved');
    node.setProperty('workDir', pathToWorkDir);
    node.setProperty('binaryFile', pathToBinaryFile);
    node.setProperty('cores', coresNumber);
    node.setProperty('flags', slurmFlags);
    node.setProperty('checkbox', checkbox);
    node.setProperty('order', node.order);
    if (checkbox === true) {
      node.setProperty('order', 1);
    } else {
      node.setProperty('order', node.order);
    }
    closeMenu();
  };

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
            '& .MuiTextField-root': { m: 1, width: '332px' },
          }}
          noValidate
          autoComplete="off">
          <div>
            <TextField
              id="workDir"
              label="Рабочая директория"
              onChange={function (evt) {
                const newValue = evt.target.value;
                setpathToWorkDir(newValue);
              }}
              value={pathToWorkDir}
              variant="standard"
            />
            <TextField
              id="binaryFile"
              label="Путь к бинарному файлу"
              onChange={function (evt) {
                const newValue = evt.target.value;
                setPathToBinaryFile(newValue);
              }}
              value={pathToBinaryFile}
              variant="standard"
            />
            <TextField
              id="cores"
              label="Количество ядер"
              type="number"
              onChange={function (evt) {
                const newValue = evt.target.value;
                setCoresNumber(newValue);
              }}
              value={coresNumber}
              variant="standard"
            />
            <TextField
              id="flags"
              label="Аргументы/Флаги"
              onChange={function (evt) {
                const newValue = evt.target.value;
                setSlurmFlags(newValue);
              }}
              value={slurmFlags}
              variant="standard"
            />
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

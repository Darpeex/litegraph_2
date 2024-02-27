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
  console.log(node);
  const [pathToWorkDir, setpathToWorkDir] = useState(node ? node.properties.workDir : PATH_TO_DIR);
  const [pathToBinaryFile, setPathToBinaryFile] = useState(node ? node.properties.binaryFile : PATH_TO_FILE);
  const [coresNumber, setCoresNumber] = useState(node ? node.properties.cores : null);
  const [slurmFlags, setSlurmFlags] = useState(node ? node.properties.flags : '');
  // const [order, setOrder] = useState(node ? node.order : null);
  // console.log(order);
  // console.log(node ? node.order : null);

  useEffect(() => {
    if (node) {
      setPathToBinaryFile(node.properties.binaryFile);
    }
  }, [node]);

  // Вызов функции отрисовки блока и закрытие SideMenuProperties
  const handleSave = () => {
    console.log('saved');
    node.setProperty('workDir', pathToWorkDir);
    node.setProperty('binaryFile', pathToBinaryFile);
    node.setProperty('cores', coresNumber);
    node.setProperty('flags', slurmFlags);
    // node.setProperty('order', order);
    closeMenu();
  };

  const handleClose = () => {
    console.log('closed');
    closeMenu();
  };

  return (
    <Drawer anchor="right" open={menuOpen} onClose={handleClose} variant="persistent">
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
              defaultValue={PATH_TO_DIR}
              InputProps={{
                readOnly: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <TextField
              id="flags"
              label="Аргументы/Флаги"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <FormControlLabel
              color="main"
              sx={{ m: 1, width: '332px', justifyContent: 'start' }}
              control={<Checkbox />}
              label="Запускать сразу"
              labelPlacement="start"
              // onClick={() => setOrder(1)}
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

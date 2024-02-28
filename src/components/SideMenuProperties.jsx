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
  const [pathToWorkDir, setPathToWorkDir] = useState(node ? node.properties.workDir : PATH_TO_DIR);
  const [pathToBinaryFile, setPathToBinaryFile] = useState(node ? node.properties.binaryFile : PATH_TO_FILE);
  const [coresNumber, setCoresNumber] = useState(node ? node.properties.cores : '');
  const [slurmFlags, setSlurmFlags] = useState(node ? node.properties.flags : '');
  const [checkbox, setCheckbox] = useState(node ? node.properties.checkbox : false);

  const properties = {
    name: 'Свойства',
    props: [
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

import React, { useState } from 'react';
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
import {
  handleMountAdditionalBlock,
  handleMountSubstractionBlock,
  handleMountMultiplicationBlock,
  handleMountDivisionBlock,
} from './nodes/functions';

const SideMenuProperties = ({ menuOpen, closeMenu }) => {
  // Свойства узла
  const properties = [
    { name: 'Рабочая директория', handler: handleMountAdditionalBlock },
    { name: 'Путь к бинарному файлу', handler: handleMountSubstractionBlock },
    { name: 'Количество ядер', handler: handleMountMultiplicationBlock },
    { name: 'Аргументы/Флаги', handler: handleMountDivisionBlock },
  ];

  // Вызов функции отрисовки блока и закрытие SideMenuProperties
  const handleSave = (handler) => {
    // handler();
    closeMenu();
  };

  return (
    <Drawer anchor="right" open={menuOpen} onClose={closeMenu} variant="persistent">
      <List sx={{ width: '350px' }}>
        <ListItem>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary="Свойства узла" />
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
              id="work-dir"
              label="Рабочая директория"
              defaultValue={PATH_TO_DIR}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="standard-required"
              label="Путь к бинарному файлу"
              defaultValue={PATH_TO_FILE}
              variant="standard"
            />
            <TextField
              id="number-of-cores"
              label="Количество ядер"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <TextField
              id="standard-helperText"
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

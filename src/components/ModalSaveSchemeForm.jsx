import { useState } from 'react';
import { mainApi } from '../utils/MainApi';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Modal, Typography, Button, IconButton, TextField } from '@mui/material';

export function ModalSaveSchemeForm({ graph, openModalSaveSchemeForm, setOpenModalSaveSchemeForm }) {
  const handleClose = () => setOpenModalSaveSchemeForm(false);
  const [schemeNameValue, setSchemeNameValue] = useState('');

  // Устанавливает имя схемы
  const setSchemeName = (evt) => {
    const value = evt.target.value;
    setSchemeNameValue(value);
  };

  // Сохранить схему
  function saveGraph() {
    const json = graph.serialize();
    const data = { schemeJSON: json, schemeName: schemeNameValue };
    mainApi.createScheme(data);
    handleClose();
  }

  return (
    <Modal open={openModalSaveSchemeForm} onClose={handleClose}>
      <Box
        sx={{
          p: 3,
          width: 500,
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <IconButton aria-label="close modal" sx={{ p: 0, position: 'absolute', right: 24 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" textAlign="center" sx={{ mt: 3 }}>
          Cохранение схемы
        </Typography>

        <TextField
          label="Введите имя файла"
          variant="standard"
          autoFocus={true}
          sx={{
            mt: 3,
            mb: 2,
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          onChange={(evt) => setSchemeName(evt)}></TextField>
        <Button variant="contained" onClick={saveGraph}>
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
}

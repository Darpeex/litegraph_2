import { useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Modal, Typography, Button, IconButton, TextField } from '@mui/material';

export function ModalSaveSchemeForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
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
        <IconButton aria-label="close modal" sx={{ p: 0, position: 'absolute', right: 24 }} onClick={''}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" textAlign="center" sx={{ mt: 3 }}>
          Cохранение схемы
        </Typography>

        <TextField
          label="Введите имя файла"
          variant="standard"
          sx={{
            mt: 3,
            mb: 2,
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          onChange={function (evt) {
            const newValue = evt.target.value;
            console.log(newValue);
          }}></TextField>
        <Button variant="contained" onClick={''}>
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
}

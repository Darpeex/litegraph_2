import { useState, useRef } from 'react';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, Divider, Modal, Typography, IconButton } from '@mui/material';

export function ModalSchemeList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schemes = [
    { schemeId: 'Схема 1', JSON: 'something' },
    { schemeId: 'Схема 2', JSON: 'somethingElse' },
    { schemeId: 'Схема 3', JSON: 'somethingAndElse' },
  ];

  const timer = useRef();
  const handleClickScheme = (evt) => {
    clearTimeout(timer.current);

    // когда происходит одиночный клик, устанавливается таймер, который будет вызывать функцию через 200 миллисекунд. Если раньше этого произойдёт двойной клик - очищаем таймер и вызоваем вторую функцию
    if (evt.detail === 1) {
      // передаём функцию, а не её результат, чтобы отложить её вызов
      timer.current = setTimeout(() => console.log('handleClick'), 400);
    } else if (evt.detail === 2) {
      console.log('onDoubleClick');
    }
  };

  const deleteScheme = () => {};

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 3,
          width: 500,
          position: 'absolute',
          bgcolor: 'background.paper',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <IconButton aria-label="close modal" sx={{ p: 0, position: 'absolute', right: 24 }} onClick={''}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" textAlign="center" sx={{ mt: 2 }}>
          Доступные схемы
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />

        {schemes.map((scheme) => (
          <Box key={scheme.schemeId} sx={{ display: 'flex', mt: 1.5 }}>
            <Typography
              onClick={handleClickScheme}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'fit-content',
              }}>
              {scheme.schemeId}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="primary" aria-label="remove scheme" sx={{ p: 0 }} onClick={deleteScheme}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Modal>
  );
}

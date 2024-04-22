import { useRef } from 'react';
import { mainApi } from '../utils/MainApi';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, Divider, Modal, Typography, IconButton } from '@mui/material';

export function ModalSchemeList({
  graph,
  schemesFromDB,
  setSchemesFromDB,
  openModalSchemeList,
  setOpenModalSchemeList,
}) {
  // закрыть модальное окно
  const handleClose = () => {
    setOpenModalSchemeList(false);
  };

  const timer = useRef();
  const handleClickScheme = (evt, scheme) => {
    clearTimeout(timer.current);
    // когда происходит одиночный клик, устанавливается таймер, который будет вызывать функцию через 200 миллисекунд. Если раньше этого произойдёт двойной клик - очищаем таймер и вызоваем вторую функцию
    if (evt.detail === 1) {
      // передаём функцию, а не её результат, чтобы отложить её вызов
      timer.current = setTimeout(() => {
        graph.configure(JSON.parse(scheme.schemeJSON)); // Открыть JSON схему
        handleClose();
      }, 250);
    } else if (evt.detail === 2) {
      console.log('onDoubleClick');
    }
  };

  // Удаление схемы
  const deleteScheme = (index, scheme) => {
    const updatedSchemes = [...schemesFromDB];
    updatedSchemes.splice(index, 1);
    setSchemesFromDB(updatedSchemes);
    mainApi.deleteScheme(scheme._id);
  };

  return (
    <Modal open={openModalSchemeList} onClose={handleClose}>
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
        <IconButton aria-label="close modal" sx={{ p: 0, position: 'absolute', right: 24 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" textAlign="center" sx={{ mt: 2 }}>
          Доступные схемы
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />

        {schemesFromDB.map((scheme, index) => (
          <Box key={scheme._id} sx={{ display: 'flex', mt: 1.5 }}>
            <Typography
              onClick={(evt) => handleClickScheme(evt, scheme)}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'fit-content',
              }}>
              {scheme.schemeName}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="primary"
              aria-label="remove scheme"
              sx={{ p: 0 }}
              onClick={() => deleteScheme(index, scheme)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Modal>
  );
}

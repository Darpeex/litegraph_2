import { useRef } from 'react';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, Divider, Modal, Typography, IconButton } from '@mui/material';

export function ModalSchemeList({ schemesFromDB, openModalSchemeList, setOpenModalSchemeList }) {
  const handleClose = () => {
    setOpenModalSchemeList(false);
  };

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

  // Открыть JSON схему
  // const handleOpenScheme = () => {
  //   // создали элемент 'input' и присвоили полю тип 'file'
  //   const input = document.createElement('input');
  //   input.type = 'file';

  //   input.click(); // открытие диалогового окна для выбора файла
  //   // когда пользователь выбрал схему - 'onchange'
  //   input.onchange = (e) => {
  //     const file = e.target.files[0]; // выбранная схема со своими свойствами
  //     const reader = new FileReader(); // объект c методами обработки данных

  //     reader.readAsText(file); // прочитать содержимое файла как текст
  //     reader.onload = function () {
  //       // преобразовываем JSON и выводим график
  //       graph.configure(JSON.parse(reader.result));
  //     };
  //     // если ошибка, сообщаем в консоли
  //     reader.onerror = function () {
  //       console.log(reader.error);
  //     };
  //   };
  // };

  const deleteScheme = () => {};

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

        {schemesFromDB.map((scheme) => (
          <Box key={scheme._id} sx={{ display: 'flex', mt: 1.5 }}>
            <Typography
              onClick={handleClickScheme}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'fit-content',
              }}>
              {scheme._id}
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

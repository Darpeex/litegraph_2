import { useState } from 'react';
import { mainApi } from '../utils/MainApi';
// import { grey } from '@mui/material/colors';
import { Box, Divider, Modal, Typography, TextField, IconButton, Button } from '@mui/material';
import {
  Close as CloseIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  ModeEdit as ModeEditIcon,
} from '@mui/icons-material';

export function ModalSchemeList({
  graph,
  schemesFromDB,
  setSchemesFromDB,
  openModalSchemeList,
  setOpenModalSchemeList,
}) {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [schemeNameValue, setSchemeNameValue] = useState('');
  const [schemeRenameField, setSchemeRenameField] = useState(false);

  // Устанавливает имя схемы
  const setSchemeName = (evt) => {
    const value = evt.target.value;
    setSchemeNameValue(value);
  };

  // закрыть модальное окно
  const handleClose = () => {
    setOpenModalSchemeList(false);
    setSchemeRenameField(false);
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
          Сохраненные схемы
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />

        {schemesFromDB.length === 0 ? (
          <Typography
            sx={{
              pt: 1,
              pb: 1,
              textAlign: 'center',
            }}>
            Доступных схем пока нет
          </Typography>
        ) : (
          schemesFromDB.map((scheme, index) => (
            <Box key={scheme._id} sx={{ display: 'flex', mt: 1.5 }}>
              {schemeRenameField && index === selectedScheme ? (
                <>
                  <TextField
                    label="Введите новое имя"
                    variant="standard"
                    defaultValue={scheme.schemename}
                    onChange={(evt) => setSchemeName(evt)}
                    sx={{ width: '100%' }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="rename scheme"
                    onClick={() => {
                      const data = { _id: scheme._id, schemename: schemeNameValue };
                      mainApi.renameScheme(data).then(() => {
                        scheme.schemename = schemeNameValue;
                        setSchemeRenameField(false);
                      });
                    }}>
                    <CheckIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  {/* <Button variant="text" color={grey[900]}> */}
                  <Typography
                    onClick={() => {
                      graph.configure(scheme.schemejson); // Открыть JSON схему
                      handleClose();
                    }}
                    onChange={(evt) => setSchemeName(evt)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: 'fit-content',
                    }}>
                    {scheme.schemename}
                  </Typography>
                  {/* </Button> */}
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    color="primary"
                    aria-label="rename scheme"
                    onClick={() => {
                      setSelectedScheme(index);
                      setSchemeRenameField(true);
                      setSchemeNameValue(scheme.schemename);
                    }}>
                    <ModeEditIcon />
                  </IconButton>
                </>
              )}
              <IconButton color="primary" aria-label="remove scheme" onClick={() => deleteScheme(index, scheme)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Modal>
  );
}

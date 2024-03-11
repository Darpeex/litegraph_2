import React, { useState, useRef } from 'react';
import { Box, TextField, Tooltip, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';

function InputsPorts({ node, toggle, setToggle }) {
  const inputRef = useRef(null); // cсылка на элемент ввода для каждого порта
  const [inputRefs, setInputRefs] = useState(node && node.inputs ? node.inputs.map(() => React.createRef()) : []);
  const [inputCounter, setInputCounter] = useState(0); // cчётчик портов

  const handleAddInput = () => {
    const newInputId = inputCounter + 1;
    setInputCounter(newInputId);

    node.addInput(`Вход ${newInputId}`);
    // Обновляем массив ссылок, добавляя новую ссылку
    setInputRefs((prevRefs) => [...prevRefs, React.createRef()]);
    setToggle(!toggle);
  };

  // Удалить входной порт
  const handleRemoveInput = (inputIndex) => {
    node.removeInput(inputIndex);
    setToggle(!toggle);
  };

  // Функция для обновления имени входного порта и установки фокуса
  const handleInputNameChange = (input, newName) => {
    input.name = newName;
    // Установите фокус обратно на элемент ввода после его обновления
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setToggle(!toggle); // Принудительное обновление интерфейса
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
        <Typography textAlign="center" sx={{ p: 1, pr: 0 }}>
          Входные порты
        </Typography>
        <Tooltip title="Добавить входной порт">
          <IconButton color="primary" aria-label="add input" onClick={handleAddInput}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {node &&
        node.inputs &&
        node.inputs.length > 0 &&
        node.inputs.map((input, index) => (
          <Box key={index} sx={{ m: 1, display: { xs: 'none', md: 'flex' } }}>
            <TextField
              type="string"
              onChange={(evt) => {
                const newValue = evt.target.value;
                handleInputNameChange(input, newValue, index);
              }}
              value={input.name}
              variant="standard"
              sx={{ flexGrow: 1, pr: 1 }}
              InputProps={{ disableUnderline: true }}
              inputRef={inputRefs[index]} // ссылка на элемент ввода
            />
            <IconButton
              color="primary"
              aria-label="remove input"
              sx={{ p: 0 }}
              onClick={() => handleRemoveInput(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
    </>
  );
}

export default InputsPorts;

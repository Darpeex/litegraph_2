import { LiteGraph } from 'litegraph.js';
import { useState, useEffect } from 'react';
import {
  Box,
  List,
  Tooltip,
  Collapse,
  TextField,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  AutorenewOutlined as AutorenewOutlinedIcon,
} from '@mui/icons-material';

function OutputsPorts({ node, toggle, setToggle }) {
  const [outputPorts, setOutputPorts] = useState([]); // массив портов
  const [outputCounter, setOutputCounter] = useState(0); // счётчик портов
  const [openSubMenus, setOpenSubMenus] = useState([false, false]); // подменю
  const [outputTitlesArr, setOutputTitlesArr] = useState([]); // массив заголовков портов
  const [outputPathToWorkDir, setOutputPathToWorkDir] = useState(node && node.outputs ? node.outputs.workDir : ''); // путь к рабочей директории
  const [outputPathToBinaryFile, setOutputPathToBinaryFile] = useState(
    node && node.outputs ? node.outputs.binaryFile : '',
  ); // путь к бинарному файлу
  const [outputCores, setOutputCores] = useState(node && node.outputs ? node.outputs.cores : ''); // количество ядер
  const [outputFlags, setOutputFlags] = useState(node && node.outputs ? node.outputs.flags : ''); // флаги

  const properties = [
    {
      id: 'name',
      label: 'Имя порта',
      type: 'string',
      setState: setOutputTitlesArr,
      value: outputTitlesArr,
    },
    {
      id: 'workDir',
      label: 'Рабочая директория',
      type: 'string',
      setState: setOutputPathToWorkDir,
      value: outputPathToWorkDir,
    },
    {
      id: 'binaryFile',
      label: 'Путь к бинарному файлу',
      type: 'string',
      setState: setOutputPathToBinaryFile,
      value: outputPathToBinaryFile,
    },
    { id: 'cores', label: 'Количество ядер', type: 'number', setState: setOutputCores, value: outputCores },
    { id: 'flags', label: 'Аргументы/Флаги', type: 'string', setState: setOutputFlags, value: outputFlags },
  ];

  // При открытии свойств нового узла, данные обновляются на ранее сохраненные в нём
  useEffect(() => {
    if (node && node.outputs) {
      const outputsTitles = node.outputs.map((element) => element.name);
      setOutputTitlesArr(outputsTitles);
      setOutputPorts(node.outputs);
    }
  }, [node]);

  // Определяем открытое/закрытое подменю по индексу
  const handleClick = (index) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      const newOpenSubMenus = [...prevOpenSubMenus]; // создаем новую копию состояния массива
      newOpenSubMenus[index] = !newOpenSubMenus[index]; // переключаем состояние конкретного подменю
      return newOpenSubMenus;
    });
  };

  // Добавить выходной порт
  const handleAddOutput = () => {
    const newOutputId = outputCounter + 1;
    setOutputCounter(newOutputId);
    // свойства выходного порта
    const newOutput = {
      id: newOutputId,
      name: `Выход ${newOutputId}`,
      workDir: '',
      binaryFile: '',
      cores: '',
      flags: '',
    };

    node.addOutput(newOutput.name); // добавляем новый порт в node.outputs
    const updatedOutputs = node.outputs.map((output) => {
      if (output.name === newOutput.name) {
        Object.assign(output, newOutput); // добавляем свойства новому порту
      }
      return output;
    });

    setOutputPorts(updatedOutputs); // обновляем массив портов
    setOpenSubMenus([...openSubMenus, false]); // false в openSubMenus для нового порта
    setToggle(!toggle);
  };

  // Удалить выходной порт
  const handleRemoveOutput = (outputIndex) => {
    node.removeOutput(outputIndex);
    setOutputPorts(outputPorts.filter((_, index) => index !== outputIndex)); // удаляем из массива портов
    setOpenSubMenus(openSubMenus.filter((_, index) => index !== outputIndex)); // удаляем из openSubMenus
    setToggle(!toggle);
  };

  // Функция для обновления свойств конкретного выходного порта
  const handleOutputPropertyChange = (outputId, property, newValue) => {
    setOutputPorts(
      (
        prevPorts, // перебераем уже существующие порты
      ) =>
        prevPorts.map((port) => {
          if (port.id === outputId) {
            const updatedPort = { ...port, [property]: newValue }; // обновляем свойство порта в нашем массиве
            const nodeOutput = node.outputs.find((output) => output.id === outputId); // обнавляем свойство в node.outputs
            if (nodeOutput) {
              nodeOutput[property] = newValue;
            } // возвращаем обновлённый порт
            return updatedPort;
          } // возвращаем остальные порты
          return port;
        }),
    );
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
        <Typography textAlign="center" sx={{ p: 1, pr: 0 }}>
          Выходные порты
        </Typography>
        <Tooltip title="Добавить выходной порт">
          <IconButton color="primary" aria-label="add output" onClick={handleAddOutput}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {node &&
        node.outputs &&
        node.outputs.length > 0 &&
        node.outputs.map((output, outputIndex) => (
          <Box key={outputIndex} sx={{ m: 1, display: { xs: 'none', md: 'flex', flexDirection: 'column' } }}>
            <Box key={outputIndex} sx={{ m: 0, display: { xs: 'none', md: 'flex' } }}>
              <ListItemButton sx={{ p: 0 }} onClick={() => handleClick(outputIndex)}>
                <ListItemText primary={output.name} sx={{ maxWidth: '320px', overflowWrap: 'break-word' }} />
                {openSubMenus[outputIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {node && node.type === 'basic/baseMode' ? (
                <IconButton
                  color="primary"
                  aria-label="remove output"
                  sx={{ p: 0 }}
                  onClick={() =>
                    node.setOutputDataType(outputIndex, output.type === 'number' ? LiteGraph.EVENT : 'number')
                  }>
                  <AutorenewOutlinedIcon />
                </IconButton>
              ) : (
                <></>
              )}
              <IconButton
                color="primary"
                aria-label="remove output"
                sx={{ p: 0 }}
                onClick={() => handleRemoveOutput(outputIndex)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Collapse in={openSubMenus[outputIndex]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 2, width: '352px' }}>
                {properties.map((prop, index) => (
                  <TextField
                    key={prop + index}
                    id={prop.id}
                    label={prop.label}
                    type={prop.type}
                    onChange={function (evt) {
                      const newValue = evt.target.value;
                      handleOutputPropertyChange(output.id, prop.id, newValue);
                    }}
                    value={outputPorts.find((port) => port.id === output.id)?.[prop.id] || ''} // ?. - защита от undefined
                    variant="standard"
                    sx={{ mt: 1, width: '100%' }}
                  />
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
    </>
  );
}

export default OutputsPorts;

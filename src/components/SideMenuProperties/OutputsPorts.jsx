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
  const [outputPorts, setOutputPorts] = useState([]);
  const [outputCounter, setOutputCounter] = useState(0);
  const [openSubMenus, setOpenSubMenus] = useState([false, false]); // Состояние подменю
  const [outputTitlesArr, setOutputTitlesArr] = useState([]);
  const [outputPathToWorkDir, setOutputPathToWorkDir] = useState(node && node.outputs ? node.outputs.workDir : '');
  const [outputPathToBinaryFile, setOutputPathToBinaryFile] = useState(
    node && node.outputs ? node.outputs.binaryFile : '',
  );
  const [outputCores, setOutputCores] = useState(node && node.outputs ? node.outputs.cores : '');
  const [outputFlags, setOutputFlags] = useState(node && node.outputs ? node.outputs.flags : '');

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

  // При открытии свойств нового узла, данные обновляются на сохраненные в узле
  useEffect(() => {
    if (node && node.outputs) {
      const outputsTitles = node.outputs.map((element) => element.name);
      setOutputTitlesArr(outputsTitles);
      setOutputPorts(node.outputs);
    }
  }, [node]);

  // ВЫНЕСТИ ПОТОМ из SideMenu'шек в константу
  // Обновляем обработчик, чтобы он принимал индекс нажатого подменю
  const handleClick = (index) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      // Создаем новую копию состояния массива
      const newOpenSubMenus = [...prevOpenSubMenus];
      // Переключаем состояние конкретного подменю
      newOpenSubMenus[index] = !newOpenSubMenus[index];
      return newOpenSubMenus;
    });
  };

  // Добавить выходной порт
  const handleAddOutput = () => {
    const newOutputId = outputCounter + 1;
    setOutputCounter(newOutputId);

    const newOutput = {
      id: newOutputId,
      name: `Выход ${newOutputId}`,
      workDir: '',
      binaryFile: '',
      cores: '',
      flags: '',
    };
    // Проверяем, существует ли узел node и свойство outputs, и если нет, инициализируем его как пустой массив
    node.addOutput(newOutput.name);
    // Добавляем новый порт в node.outputs
    const updatedOutputs = node.outputs.map((output) => {
      if (output.name === newOutput.name) {
        Object.assign(output, newOutput);
      }
      return output;
    });
    // Обновляем состояние outputPorts
    setOutputPorts(updatedOutputs);
    // Добавляем false в openSubMenus для нового порта
    setOpenSubMenus([...openSubMenus, false]);
    setToggle(!toggle);
  };

  // Удалить выходной порт
  const handleRemoveOutput = (outputIndex) => {
    node.removeOutput(outputIndex);
    // Обновляем состояние outputPorts
    setOutputPorts(outputPorts.filter((_, index) => index !== outputIndex));
    // Удаляем флаг для удаленного порта из openSubMenus
    setOpenSubMenus(openSubMenus.filter((_, index) => index !== outputIndex));
    setToggle(!toggle);
  };
  // Функция для обновления свойств конкретного выходного порта
  const handleOutputPropertyChange = (outputId, property, newValue) => {
    setOutputPorts((prevPorts) =>
      prevPorts.map((port) => {
        if (port.id === outputId) {
          const updatedPort = { ...port, [property]: newValue };
          // Обновляем свойство в node.outputs
          const nodeOutput = node.outputs.find((output) => output.id === outputId);
          if (nodeOutput) {
            nodeOutput[property] = newValue;
          }
          return updatedPort;
        }
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
                    value={outputPorts.find((port) => port.id === output.id)?.[prop.id] || ''}
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

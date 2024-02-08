import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import FunctionsIcon from '@mui/icons-material/Functions';
import CalculateIcon from '@mui/icons-material/Calculate';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
import {
  handleMountConstantNumberBlock,
  handleMountResultBlock,
  handleMountAdditionalBlock,
  handleMountSubstractionBlock,
  handleMountMultiplicationBlock,
  handleMountDivisionBlock,
} from './nodes/functions';

const SideMenu = ({ menuOpen, closeMenu }) => {
  const tools = ['Функциональные блоки', 'Программные блоки'];
  const icons = [<FunctionsIcon />, <CalculateIcon />];
  const functionalBlocksNames = ['Сложение', 'Вычитание', 'Умножение', 'Деление'];
  const functionalBlocks = [
    handleMountAdditionalBlock,
    handleMountSubstractionBlock,
    handleMountMultiplicationBlock,
    handleMountDivisionBlock,
  ];
  const programBlocksNames = ['Задать число', 'Вывести результат'];
  const programBlocks = [handleMountConstantNumberBlock, handleMountResultBlock];
  const blockLists = [functionalBlocksNames, programBlocksNames];
  const functionalBlocksList = [functionalBlocks, programBlocks];

  // Инициализируем массив булевых значений, представляющих открытый или закрытый состояние каждого подменю
  const [openSubMenus, setOpenSubMenus] = useState([false, false]);

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

  return (
    <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
      <List sx={{ width: '350px' }}>
        <ListItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Инструменты" />
        </ListItem>
        <Divider />
        {tools.map((toolName, index) => (
          <>
            <ListItemButton onClick={() => handleClick(index)} key={toolName}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={toolName} />
              {openSubMenus[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSubMenus[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {blockLists[index].map((blockName, blockListIndex) => (
                  // index - индекс инструментов (tools) (2 инструмента в списке)
                  // blockListIndex - индекс названий и функций кнопок (blockLists и functionalBlocksList) (4 и 2 кнопки в списке каждого инструмента)
                  <ListItemButton
                    key={blockName}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      if (blockLists[index].length > blockListIndex) {
                        functionalBlocksList[index][blockListIndex](closeMenu);
                      } else {
                        alert('Функция временно не доступна');
                      }
                    }}>
                    <ListItemText primary={blockName} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;

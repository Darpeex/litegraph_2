import { useState } from 'react';
import CableIcon from '@mui/icons-material/Cable';
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
  const tools = ['Функциональные блоки', 'Программные блоки', 'Трансферы'];
  const icons = [<FunctionsIcon />, <CalculateIcon />, <CableIcon />];
  const functionalBlocksNames = ['Сложение', 'Вычитание', 'Умножение', 'Деление'];
  const functionalBlocks = [
    handleMountAdditionalBlock,
    handleMountSubstractionBlock,
    handleMountMultiplicationBlock,
    handleMountDivisionBlock,
  ];
  const programBlocksNames = ['Число Фибоначчи', 'Блок с условием'];
  const programBlocks = [handleMountConstantNumberBlock, handleMountResultBlock];
  const transfersNames = ['Тип связи 1', 'Тип связи 2'];
  const transfers = [handleMountConstantNumberBlock, handleMountResultBlock];
  const blockLists = [functionalBlocksNames, programBlocksNames, transfersNames];
  const functionalBlocksList = [functionalBlocks, programBlocks, transfers];

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
        {tools.map((text, index) => (
          <>
            <ListItemButton onClick={() => handleClick(index)} key={text}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
              {openSubMenus[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSubMenus[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {blockLists[index].map((block, blockListIndex) => (
                  // index -  инструменты (3)
                  // blockListIndex - индекс кнопки (4 2 2)
                  <ListItemButton
                    key={block}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      if (blockLists[index].length > blockListIndex) {
                        functionalBlocksList[index][blockListIndex](closeMenu);
                      } else {
                        alert('Функция временно не доступна');
                      }
                    }}>
                    <ListItemText primary={block} />
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

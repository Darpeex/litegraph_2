import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import FunctionsIcon from '@mui/icons-material/Functions';
import CalculateIcon from '@mui/icons-material/Calculate';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';

const SideMenu = ({ menuOpen, closeMenu }) => {
  const tools = ['Функциональные блоки', 'Программные блоки'];
  const icons = [<FunctionsIcon />, <CalculateIcon />];
  const functionalBlocks = ['Сложение', 'Вычитание', 'Умножение', 'Деление'];
  const programBlocks = ['Число Фибоначчи'];
  const blockLists = [functionalBlocks, programBlocks];

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
                {blockLists[index].map((block) => (
                  <ListItemButton key={block} sx={{ pl: 4 }}>
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

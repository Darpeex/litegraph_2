import React, { useState } from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Settings as SettingsIcon,
  Functions as FunctionsIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import {
  handleMountConstantNumberBlock,
  handleMountResultBlock,
  handleMountAdditionalBlock,
  handleMountSubstractionBlock,
  handleMountMultiplicationBlock,
  handleMountDivisionBlock,
} from './nodes/functions';

const SideMenu = ({ menuOpen, closeMenu }) => {
  // Инструменты - раскрывающиеся списки с кнопками вызовов блоков
  const tools = [
    {
      name: 'Функциональные блоки',
      icon: <FunctionsIcon />,
      blocks: [
        { name: 'Сложение', handler: handleMountAdditionalBlock },
        { name: 'Вычитание', handler: handleMountSubstractionBlock },
        { name: 'Умножение', handler: handleMountMultiplicationBlock },
        { name: 'Деление', handler: handleMountDivisionBlock },
      ],
    },
    {
      name: 'Программные блоки',
      icon: <CalculateIcon />,
      blocks: [
        { name: 'Задать число', handler: handleMountConstantNumberBlock },
        { name: 'Вывести результат', handler: handleMountResultBlock },
      ],
    },
  ];

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

  // Вызов функции отрисовки блока и закрытие SideMenu
  const handleBlockClick = (handler) => {
    handler();
    closeMenu();
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
        {tools.map((tool, index) => (
          <>
            <ListItemButton onClick={() => handleClick(index)} key={tool.name}>
              <ListItemIcon>{tool.icon}</ListItemIcon>
              <ListItemText primary={tool.name} />
              {openSubMenus[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSubMenus[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {tool.blocks.map((block) => (
                  <ListItemButton
                    key={block.name}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      handleBlockClick(block.handler);
                    }}>
                    <ListItemText primary={block.name} />
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

// React.memo - чтобы предотвратить ненужные ререндеры
// так компонент перерисовывается, когда его пропсы изменяются.
export default React.memo(SideMenu);

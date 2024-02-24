// Стандартные стили узлов
import { LiteGraph } from 'litegraph.js';

const nodeStyles = () => {
  LiteGraph.NODE_DEFAULT_COLOR = '#1565c0'; // Цвет шапки узла ('#1565c0')
  LiteGraph.NODE_DEFAULT_BGCOLOR = '#455a64'; // Цвет фона узла ('#455a64')
  LiteGraph.NODE_DEFAULT_BOXCOLOR = '#607d8b'; // Цвет рамки узла ('#607d8b')
  LiteGraph.DEFAULT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)'; // Цвет тени ('rgba(0, 0, 0, 0.5)')
  LiteGraph.NODE_TITLE_COLOR = '#fff'; // Цвет текста заголовка узла ('#fff')
  LiteGraph.NODE_TEXT_COLOR = '#fff'; // Цвет текста в узлах ('#fff')
  LiteGraph.NODE_DEFAULT_SHAPE = 'box'; // Изменить форму узла ('round')
  LiteGraph.NODE_TITLE_HEIGHT = 30; // Высота заголовка узла (30)
  LiteGraph.NODE_SLOT_HEIGHT = 15; // Высота слотов узла (15)
  LiteGraph.NODE_WIDGET_HEIGHT = 20; // Высота виджетов узла (20)
  LiteGraph.NODE_WIDTH = 140; // Ширина узла (140)
  LiteGraph.NODE_MIN_WIDTH = 50; // Минимальная ширина узла (50)
  LiteGraph.NODE_COLLAPSED_RADIUS = 0; // Радиус свернутого узла (0)
  LiteGraph.NODE_COLLAPSED_WIDTH = 80; // Ширина свернутого узла (80)
  LiteGraph.NODE_TEXT_SIZE = 14; // Размер текста в узлах (14)
  LiteGraph.NODE_SUBTEXT_SIZE = 12; // Размер подтекста в узлах (12)
  LiteGraph.DEFAULT_GROUP_FONT = 24; // Размер шрифта группы узлов (24)
};

export default nodeStyles;

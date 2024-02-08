// Стандартные стили узлов
import { LiteGraph } from 'litegraph.js';

const nodeStyles = () => {
  LiteGraph.NODE_DEFAULT_COLOR = '#1565c0'; // Цвет шапки узла
  LiteGraph.NODE_DEFAULT_BGCOLOR = '#455a64'; // Цвет фона узла
  LiteGraph.NODE_DEFAULT_BOXCOLOR = '#607d8b'; // Цвет рамки узла
  LiteGraph.DEFAULT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)'; // Цвет тени
  LiteGraph.NODE_TITLE_COLOR = '#fff'; // Цвет текста заголовка узла
  LiteGraph.NODE_TEXT_COLOR = '#fff'; // Цвет текста в узлах
  LiteGraph.NODE_DEFAULT_SHAPE = 'round'; // Изменить форму узла
  LiteGraph.NODE_TITLE_HEIGHT = 30; // Высота заголовка узла
  LiteGraph.NODE_SLOT_HEIGHT = 15; // Высота слотов узла
  LiteGraph.NODE_WIDGET_HEIGHT = 20; // Высота виджетов узла
  LiteGraph.NODE_WIDTH = 140; // Ширина узла
  LiteGraph.NODE_MIN_WIDTH = 50; // Минимальная ширина узла
  LiteGraph.NODE_COLLAPSED_RADIUS = 10; // Радиус свернутого узла
  LiteGraph.NODE_COLLAPSED_WIDTH = 80; // Ширина свернутого узла
  LiteGraph.NODE_TEXT_SIZE = 14; // Размер текста в узлах
  LiteGraph.NODE_SUBTEXT_SIZE = 12; // Размер подтекста в узлах
  LiteGraph.DEFAULT_GROUP_FONT = 24; // Размер шрифта группы узлов
};

export default nodeStyles;

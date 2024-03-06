import { LiteGraph } from 'litegraph.js';
import { graph } from '../App';

// Задаётся постоянное число
export const handleMountConstantNumberBlock = () => {
  const node_constNumber = LiteGraph.createNode('basic/constNumber'); // Создаём узел с постоянным числом
  graph.add(node_constNumber); // Добавляем этот узел в графы, которые отображаются на холсте
};

// Вывод результата
export const handleMountResultBlock = () => {
  const node_watch = LiteGraph.createNode('basic/result'); // Создаём узел, который отображает входные данные
  graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте
};

// Сложение
export const handleMountAdditionalBlock = () => {
  const node_addition = LiteGraph.createNode('basic/addition');
  graph.add(node_addition);
};

// Вычитание
export const handleMountSubstractionBlock = () => {
  const node_substraction = LiteGraph.createNode('basic/substraction');
  graph.add(node_substraction);
};

// Умножение
export const handleMountMultiplicationBlock = () => {
  const node_multiplication = LiteGraph.createNode('basic/multiplication');
  graph.add(node_multiplication);
};

// Деление
export const handleMountDivisionBlock = () => {
  const node_division = LiteGraph.createNode('basic/division');
  graph.add(node_division);
};

// Таймер
export const handleMountTimerBlock = () => {
  const node_timer = LiteGraph.createNode('basic/timer');
  graph.add(node_timer);
};

// Стартовый блок
export const handleMountStartBlock = () => {
  const node_base = LiteGraph.createNode('basic/base');
  graph.add(node_base);
};

// Стартовый блок тест
export const handleMountStartModeBlock = () => {
  const node_baseMode = LiteGraph.createNode('basic/baseMode');
  graph.add(node_baseMode);
};

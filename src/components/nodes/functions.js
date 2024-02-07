import { LiteGraph } from 'litegraph.js';
import { graph } from '../Main';

// Задаётся постоянное число
export const handleMountConstantNumberBlock = (closeMenu) => {
  const node_constNumber = LiteGraph.createNode('basic/constNumber'); // Создаём узел с постоянным числом
  graph.add(node_constNumber); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

// Вывод результата
export const handleMountResultBlock = (closeMenu) => {
  const node_watch = LiteGraph.createNode('basic/result'); // Создаём узел, который отображает входные данные
  graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

// Сложение
export const handleMountAdditionalBlock = (closeMenu) => {
  const node_addition = LiteGraph.createNode('basic/addition'); // Создаём узел, который отображает входные данные
  graph.add(node_addition); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

// Вычитание
export const handleMountSubstractionBlock = (closeMenu) => {
  const node_substraction = LiteGraph.createNode('basic/substraction'); // Создаём узел, который отображает входные данные
  graph.add(node_substraction); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

// Умножение
export const handleMountMultiplicationBlock = (closeMenu) => {
  const node_multiplication = LiteGraph.createNode('basic/multiplication'); // Создаём узел, который отображает входные данные
  graph.add(node_multiplication); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

// Деление
export const handleMountDivisionBlock = (closeMenu) => {
  const node_division = LiteGraph.createNode('basic/division'); // Создаём узел, который отображает входные данные
  graph.add(node_division); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

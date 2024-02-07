import { LiteGraph } from 'litegraph.js';
import { graph } from '../Main';

export const handleMountConstantNumberBlock = (closeMenu) => {
  const node_constNumber = LiteGraph.createNode('basic/constNumber'); // Создаём узел с постоянным числом
  graph.add(node_constNumber); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

export const handleMountResultBlock = (closeMenu) => {
  const node_watch = LiteGraph.createNode('basic/result'); // Создаём узел, который отображает входные данные
  graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте
  closeMenu();
};

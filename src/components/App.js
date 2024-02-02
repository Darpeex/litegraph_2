import './App.css';
import { useEffect } from 'react';
import { LGraph, LiteGraph, LGraphNode, LGraphCanvas } from 'litegraph.js';

function App() {
  useEffect(() => {
    const graph = new LGraph(); // создаём граф
    const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

    const node_const = LiteGraph.createNode('basic/const'); // Создаём узел с постоянным числом
    node_const.pos = [200, 200]; // Определяем его координаты X, Y
    graph.add(node_const); // Добавляем этот узел в графы, которые отображаются на холсте
    node_const.setValue(4.5); // Задаём постоянное значение

    const node_watch = LiteGraph.createNode('basic/watch'); // Создаём узел, который отображает входные данные
    node_watch.pos = [700, 200]; // Определяем его координаты X, Y
    graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте

    node_const.connect(0, node_watch, 0); // Узел с константой соединяем с отображающим узлом

    graph.start(); // Запускаем график
  }, []);

  return (
    <div className="App">
      <div className="page">
        <canvas id="mycanvas" width="1200" height="876"></canvas>
      </div>
    </div>
  );
}

export default App;

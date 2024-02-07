import { useEffect } from 'react';
import AddNode from './nodes/AddNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import SubtractNode from './nodes/SubtractNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import DivideNode from './nodes/DivideNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import MultiplyNode from './nodes/MultiplyNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ResultNode from './nodes/ResultNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ConstantNumber from './nodes/ConstNumberNode';
import { LGraph, LiteGraph, LGraphCanvas } from 'litegraph.js';

function Main() {
  useEffect(() => {
    // useEffect решил проблему с отрисовкой при перезагрузке (2 строка) и с перемещением элементов (всё остальное)
    const graph = new LGraph(); // создаём граф
    const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

    function resizeCanvas() {
      canvas.resize(window.innerWidth, window.innerHeight); // Устанавливаем размеры холста равными размерам окна
      canvas.draw(true); // Перерисовываем холст
    }

    const node_addition = LiteGraph.createNode('basic/addition'); // Создаём собственный узел
    node_addition.pos = [500, 400]; // Определяем его координаты X, Y
    graph.add(node_addition); // Добавляем этот узел в графы, которые отображаются на холсте

    const node_substraction = LiteGraph.createNode('basic/substraction'); // Создаём собственный узел
    node_substraction.pos = [900, 400]; // Определяем его координаты X, Y
    graph.add(node_substraction); // Добавляем этот узел в графы, которые отображаются на холсте

    const node_multiplication = LiteGraph.createNode('basic/multiplication'); // Создаём собственный узел
    node_multiplication.pos = [500, 600]; // Определяем его координаты X, Y
    graph.add(node_multiplication); // Добавляем этот узел в графы, которые отображаются на холсте

    const node_division = LiteGraph.createNode('basic/division'); // Создаём собственный узел
    node_division.pos = [900, 600]; // Определяем его координаты X, Y
    graph.add(node_division); // Добавляем этот узел в графы, которые отображаются на холсте

    const node_const = LiteGraph.createNode('basic/const'); // Создаём узел с постоянным числом
    node_const.pos = [500, 200]; // Определяем его координаты X, Y
    graph.add(node_const); // Добавляем этот узел в графы, которые отображаются на холсте
    node_const.setValue(4.5); // Задаём постоянное значение

    const node_watch = LiteGraph.createNode('basic/watch'); // Создаём узел, который отображает входные данные
    node_watch.pos = [900, 200]; // Определяем его координаты X, Y
    graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте

    node_addition.connect(0, node_watch, 0); // Узел с константой соединяем с отображающим узлом

    graph.start(); // Запускаем график

    // Вызываем функцию resizeCanvas при загрузке страницы и при изменении размеров окна
    window.onload = resizeCanvas;
    window.onresize = resizeCanvas;
  }, []);

  console.log(LiteGraph.registered_node_types);

  return (
    <main className="Main">
      <div className="page">
        <canvas id="mycanvas" width="1200" height="876"></canvas>
      </div>
    </main>
  );
}

export default Main;

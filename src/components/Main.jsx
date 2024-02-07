import { useEffect } from 'react';
import AddNode from './nodes/AddNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import SubtractNode from './nodes/SubtractNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import DivideNode from './nodes/DivideNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import MultiplyNode from './nodes/MultiplyNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ResultNode from './nodes/ResultNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ConstantNumber from './nodes/ConstNumberNode';
import { LGraph, LiteGraph, LGraphCanvas } from 'litegraph.js';

// useEffect решил проблему с отрисовкой при перезагрузке (2 строка) и с перемещением элементов (всё остальное)
export const graph = new LGraph(); // создаём граф
const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

const node_constNumber = LiteGraph.createNode('basic/constNumber'); // Создаём узел с постоянным числом
node_constNumber.pos = [500, 200]; // Определяем его координаты X, Y
graph.add(node_constNumber); // Добавляем этот узел в графы, которые отображаются на холсте

const node_watch = LiteGraph.createNode('basic/result'); // Создаём узел, который отображает входные данные
node_watch.pos = [900, 200]; // Определяем его координаты X, Y
graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте

node_constNumber.connect(0, node_watch, 0); // Узел с константой соединяем с отображающим узлом

function Main() {
  useEffect(() => {
    function resizeCanvas() {
      canvas.resize(window.innerWidth, window.innerHeight); // Устанавливаем размеры холста равными размерам окна
      canvas.draw(true); // Перерисовываем холст
    }

    // Вызываем функцию resizeCanvas при загрузке страницы и при изменении размеров окна
    window.onload = resizeCanvas;
    window.onresize = resizeCanvas;
  }, []);

  graph.start(); // Запускаем график

  console.log(LiteGraph.registered_node_types);

  return (
    <main className="Main">
      <div className="page"></div>
    </main>
  );
}

export default Main;

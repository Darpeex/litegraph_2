import { useEffect } from 'react';
import nodeStyles from './nodes/nodeStyles';
import AddNode from './nodes/AddNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import SubtractNode from './nodes/SubtractNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import DivideNode from './nodes/DivideNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import MultiplyNode from './nodes/MultiplyNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ResultNode from './nodes/ResultNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ConstantNumber from './nodes/ConstNumberNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import { LGraph, LiteGraph, LGraphCanvas } from 'litegraph.js';

export const graph = new LGraph(); // создаём граф
const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

console.log(LiteGraph.registered_node_types); // обширная информация по узлам

function Main() {
  nodeStyles(); // Стили узлов по умолчанию

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
  return (
    <main className="Main">
      <div className="page"></div>
    </main>
  );
}

export default Main;

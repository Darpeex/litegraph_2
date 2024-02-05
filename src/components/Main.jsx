import { useEffect } from 'react';
import { LGraph, LiteGraph, LGraphCanvas } from 'litegraph.js';

function Main() {
  useEffect(() => {
    // useEffect решил проблему с отрисовкой при перезагрузке (2 строка) и с перемещением элементов (всё остальное)
    const graph = new LGraph(); // создаём граф
    const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

    function createNodes() {
      const node_const = LiteGraph.createNode('basic/const'); // Создаём узел с постоянным числом
      node_const.pos = [200, 200]; // Определяем его координаты X, Y
      graph.add(node_const); // Добавляем этот узел в графы, которые отображаются на холсте
      node_const.setValue(4.5); // Задаём постоянное значение

      const node_watch = LiteGraph.createNode('basic/watch'); // Создаём узел, который отображает входные данные
      node_watch.pos = [700, 200]; // Определяем его координаты X, Y
      graph.add(node_watch); // Добавляем этот узел в графы, которые отображаются на холсте

      node_const.connect(0, node_watch, 0); // Узел с константой соединяем с отображающим узлом
    }

    createNodes(); // Создаём узлы
    graph.start(); // Запускаем график

    function resizeCanvas() {
      canvas.resize(window.innerWidth, window.innerHeight); // Устанавливаем размеры холста равными размерам окна
      canvas.draw(true); // Перерисовываем холст
    }

    // Вызываем функцию resizeCanvas при загрузке страницы и при изменении размеров окна
    window.onload = resizeCanvas;
    window.onresize = resizeCanvas;

    //функция класса конструктора вашего узла
    function MyAddNode() {
      //добавьте несколько слотов ввода
      this.addInput('A', 'number');
      this.addInput('B', 'number');
      this.addInput('C', 'number');
      //добавьте несколько выходных слотов
      this.addOutput('A*B*C', 'number');
      //добавьте некоторые свойства
      this.properties = { precision: 1 };
      this.size = [150, 70];

      MyAddNode.title_color = '#1164B4';
      MyAddNode.shape = LiteGraph.ROUND_SHAPE;
    }

    //имя для отображения на холсте
    MyAddNode.title = 'multiplication';

    //функция для вызова при выполнении узла
    MyAddNode.prototype.onExecute = function () {
      //извлекать данные из входных данных
      let A = this.getInputData(0);
      if (A === undefined) A = 0;
      let B = this.getInputData(1);
      if (B === undefined) B = 0;
      let C = this.getInputData(2);
      if (C === undefined) C = 1;
      //преобразование данных в выходные данные
      this.setOutputData(0, A * B * C);
    };

    //зарегистрироваться в системе
    LiteGraph.registerNodeType('basic/multiplication', MyAddNode);

    const node_multiplication = LiteGraph.createNode('basic/multiplication'); // Создаём собственный узел
    node_multiplication.pos = [200, 400]; // Определяем его координаты X, Y
    graph.add(node_multiplication); // Добавляем этот узел в графы, которые отображаются на холсте
  }, []);

  return (
    <main className="Main">
      <div className="page">
        <canvas id="mycanvas" width="1200" height="876"></canvas>
      </div>
    </main>
  );
}

export default Main;

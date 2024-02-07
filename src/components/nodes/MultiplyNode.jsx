// функция умножения (*);
import { LiteGraph } from 'litegraph.js';

//функция класса конструктора вашего узла
function MultiplyNode() {
  //добавьте несколько слотов ввода
  this.addInput('A', 'number');
  this.addInput('B', 'number');
  //добавьте несколько выходных слотов
  this.addOutput('A * B', 'number');
  //добавьте некоторые свойства
  this.properties = { precision: 1 };
  this.size = [150, 70];

  MultiplyNode.title_color = '#1164B4';
  MultiplyNode.shape = LiteGraph.ROUND_SHAPE;
}

//имя для отображения на холсте
MultiplyNode.title = 'Умножение';

//функция для вызова при выполнении узла
MultiplyNode.prototype.onExecute = function () {
  //извлекать данные из входных данных
  let A = this.getInputData(0);
  if (A === undefined) A = 0;
  let B = this.getInputData(1);
  if (B === undefined) B = 0;
  //преобразование данных в выходные данные
  this.setOutputData(0, A * B);
};

//зарегистрироваться в системе
LiteGraph.registerNodeType('basic/multiplication', MultiplyNode);

export default MultiplyNode;
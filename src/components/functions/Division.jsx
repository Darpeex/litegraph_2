// функция деления (/);
import { LiteGraph } from 'litegraph.js';

//функция класса конструктора узла
function DivideNode() {
  //слоты ввода
  this.addInput('A', 'number');
  this.addInput('B', 'number');
  //слоты выхода
  this.addOutput('A / B', 'number');
  //свойства
  this.properties = { precision: 1 };
  this.size = [150, 70];

  DivideNode.title_color = '#612211';
  DivideNode.shape = LiteGraph.ROUND_SHAPE;
}

//имя отображения на холсте
DivideNode.title = 'Деление';

//функция вызова при выполнении узла
DivideNode.prototype.onExecute = function () {
  //извлечь данные из входных данных
  let A = this.getInputData(0);
  if (A === undefined) A = 0;
  let B = this.getInputData(1);
  if (B === undefined) B = 0;
  //преобразовать данные в выходные данные
  this.setOutputData(0, A / B);
};

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/division', DivideNode);

export default DivideNode;

//функция сложения (+);
import { LiteGraph } from 'litegraph.js';

//функция класса конструктора узла
function AddNode() {
  //слоты ввода
  this.addInput('A', 'number');
  this.addInput('B', 'number');
  //слоты выхода
  this.addOutput('A + B', 'number');
  //свойства
  this.properties = { precision: 1 };
  this.size = [150, 70];
}

//имя отображения на холсте
AddNode.title = 'Сложение';

//функция вызова при выполнении узла
AddNode.prototype.onExecute = function () {
  //извлечь данные из входных данных
  let A = this.getInputData(0);
  if (A === undefined) A = 0;
  let B = this.getInputData(1);
  if (B === undefined) B = 0;
  //преобразовать данные в выходные данные
  this.setOutputData(0, A + B);
};

// рисуем смайлик поверх узла
AddNode.prototype.onDrawBackground = function (ctx) {
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Внешняя окружность
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // рот (по часовой стрелке)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Левый глаз
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Правый глаз
  ctx.stroke();
};

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/addition', AddNode);

export default AddNode;

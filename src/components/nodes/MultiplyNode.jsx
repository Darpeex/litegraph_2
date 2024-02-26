// функция умножения (*);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

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
  // свойства для SideMenu
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('coresNumber', null);
  this.addProperty('argumentsFlags', '');
  this.addProperty('checkBox', false);
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

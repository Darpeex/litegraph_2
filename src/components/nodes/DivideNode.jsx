// функция деления (/);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора узла
function DivideNode() {
  //слоты ввода
  this.addInput('A', 'number');
  this.addInput('B', 'number');
  //слоты выхода
  this.addOutput('A / B', 'number');
  //свойства
  this.size = [150, 70];
  this.title = 'Деление';
  this.properties = { precision: 1 };
  // свойства для SideMenuProperties
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', '');
  this.addProperty('flags', '');
  this.addProperty('interval', 0);
  this.addProperty('checkbox', false);
}

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

// Обновляем порядок выполнения
DivideNode.prototype.onDrawForeground = function (ctx) {
  // Проверяем, есть ли значение порядка выполнения
  if (this.order) {
    // Устанавливаем стиль текста
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    // Вычисляем позицию текста, для отображения в правом верхнем углу
    const text = `${this.order}`; // отображаем order из свойств узла
    const textX = this.size[0] - 15; // Отступ справа
    const textY = -10; // Отступ сверху
    // Рисуем текст
    ctx.fillText(text, textX, textY);
  }
};

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/division', DivideNode);

export default DivideNode;

// функция умножения (*);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора вашего узла
function MultiplyNode() {
  //слоты ввода
  this.addInput('A', 'number');
  this.addInput('B', 'number');
  //слоты вывода
  this.addOutput('A * B', 'number');
  //свойства
  this.size = [150, 70];
  this.title = 'Умножение';
  this.properties = { precision: 1 };
  //свойства для SideMenu
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', null);
  this.addProperty('flags', '');
  this.addProperty('checkbox', false);
}

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

// Обновляем порядок выполнения
MultiplyNode.prototype.onDrawForeground = function (ctx) {
  // Проверяем, есть ли значение порядка выполнения
  if (this.order) {
    // Устанавливаем стиль текста
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    // Вычисляем позицию для текста, чтобы он отображался в правом верхнем углу
    const text = `${this.order}`; // отображаем order из свойств узла
    const textX = this.size[0] - 15; // Отступ справа
    const textY = -10; // Отступ сверху
    // Рисуем текст
    ctx.fillText(text, textX, textY);
  }
};

//зарегистрироваться в системе
LiteGraph.registerNodeType('basic/multiplication', MultiplyNode);

export default MultiplyNode;

//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

function ConstantNumber() {
  this.addProperty('value', 2.0);
  this.addOutput('value', 'number');
  this.title = 'Постоянное число';
  this.widget = this.addWidget('number', 'value', 2, 'value');
  this.widgets_up = true;
  this.size = [180, 30];
  // свойства для SideMenuProperties
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', '');
  this.addProperty('flags', '');
  this.addProperty('checkbox', false);
  // определение некоторых стилей
  ConstantNumber.title_color = '#37474f'; // Цвет заголовка
  ConstantNumber.shape = LiteGraph.SQUARE_SHAPE; // Форма блока
}

// задается значение в виде числа с плавающей точкой
ConstantNumber.prototype.onExecute = function () {
  this.setOutputData(0, parseFloat(this.properties['value']));
};

// отображает заголовок в свернутом и развернутом состоянии
ConstantNumber.prototype.getTitle = function () {
  if (this.flags.collapsed) {
    return this.properties.value;
  }
  return this.title;
};

// устанавливает значение в свойство
ConstantNumber.prototype.setValue = function (v) {
  this.setProperty('value', v);
};

// отобразить текущее значение
ConstantNumber.prototype.onDrawBackground = function () {
  this.outputs[0].label = this.properties['value'].toFixed(3);
};

// Обновляем порядок выполнения
ConstantNumber.prototype.onDrawForeground = function (ctx) {
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

LiteGraph.registerNodeType('basic/constNumber', ConstantNumber);

export default ConstantNumber;

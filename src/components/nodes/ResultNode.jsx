//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора узла
function ResultNode() {
  this.value = 0;
  this.size = [60, 40];
  this.title = 'Результат';
  this.addInput('value', 0, { label: '' });
  // свойства для SideMenu
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', null);
  this.addProperty('flags', '');
  this.addProperty('checkbox', false);
  // определение некоторых стилей
  ResultNode.title_color = '#52b202'; // Цвет заголовка
  ResultNode.shape = LiteGraph.SQUARE_SHAPE; // Форма блока
}

ResultNode.prototype.onExecute = function () {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

ResultNode.prototype.getTitle = function () {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

ResultNode.toString = function (o) {
  if (o == null) {
    return 'null';
  } else if (o.constructor === Number) {
    return o.toFixed(3);
  } else if (o.constructor === Array) {
    let str = '[';
    for (let i = 0; i < o.length; ++i) {
      str += ResultNode.toString(o[i]) + (i + 1 != o.length ? ',' : '');
    }
    str += ']';
    return str;
  } else {
    return String(o);
  }
};

// Переопределение метода onDrawBackground
ResultNode.prototype.onDrawBackground = function () {
  //показать текущее значение
  this.inputs[0].label = ResultNode.toString(this.value);
};

// Обновляем порядок выполнения
ResultNode.prototype.onDrawForeground = function (ctx) {
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

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/result', ResultNode);

export default ResultNode;

//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора узла
function ResultNode() {
  this.size = [60, 40];
  this.addInput('value', 0, { label: '' });
  this.value = 0;
  // свойства для SideMenu
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('coresNumber', null);
  this.addProperty('argumentsFlags', '');
  this.addProperty('checkBox', false);

  ResultNode.title_color = '#52b202'; // Цвет заголовка
  ResultNode.shape = LiteGraph.SQUARE_SHAPE; // Форма блока
}

//имя отображения на холсте
ResultNode.title = 'Результат';
ResultNode.desc = 'Показать значение входа';

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

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/result', ResultNode);

export default ResultNode;

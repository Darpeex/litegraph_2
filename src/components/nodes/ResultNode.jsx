//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';

//функция класса конструктора узла
function ResultNode() {
  this.size = [60, 30];
  this.addInput('value', 0, { label: '' });
  this.value = 0;
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

ResultNode.prototype.onDrawBackground = function (ctx) {
  //show the current value
  this.inputs[0].label = ResultNode.toString(this.value);
};

//зарегистрировать в системе
LiteGraph.registerNodeType('basic/result', ResultNode);

export default ResultNode;

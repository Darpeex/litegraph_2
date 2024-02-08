//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';

function ConstantNumber() {
  this.addOutput('value', 'number');
  this.addProperty('value', 2.0);
  this.widget = this.addWidget('number', 'value', 2, 'value');
  this.widgets_up = true;
  this.size = [180, 30];

  ConstantNumber.title_color = '#37474f'; // Цвет заголовка
  ConstantNumber.shape = LiteGraph.SQUARE_SHAPE; // Форма блока
}

ConstantNumber.title = 'Постоянное число';
ConstantNumber.desc = 'Постоянное число';

ConstantNumber.prototype.onExecute = function () {
  this.setOutputData(0, parseFloat(this.properties['value']));
};

ConstantNumber.prototype.getTitle = function () {
  if (this.flags.collapsed) {
    return this.properties.value;
  }
  return this.title;
};

ConstantNumber.prototype.setValue = function (v) {
  this.setProperty('value', v);
};

ConstantNumber.prototype.onDrawBackground = function () {
  // посмотреть текущее значение
  this.outputs[0].label = this.properties['value'].toFixed(3);
};

LiteGraph.registerNodeType('basic/constNumber', ConstantNumber);

export default ConstantNumber;

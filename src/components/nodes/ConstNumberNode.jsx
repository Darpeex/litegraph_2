//функция просмотра результата (=);
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

function ConstantNumber() {
  this.addOutput('value', 'number');
  this.addProperty('value', 2.0);
  this.widget = this.addWidget('number', 'value', 2, 'value');
  this.widgets_up = true;
  this.size = [180, 30];
  // свойства для SideMenu
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('coresNumber', null);
  this.addProperty('argumentsFlags', '');
  this.addProperty('checkBox', false);

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

// рисуем игру пакмен поверх узла
// function roundedRect(ctx, x, y, width, height, radius) {
//   ctx.beginPath();
//   ctx.moveTo(x, y + radius);
//   ctx.arcTo(x, y + height, x + radius, y + height, radius);
//   ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
//   ctx.arcTo(x + width, y, x + width - radius, y, radius);
//   ctx.arcTo(x, y, x, y + radius, radius);
//   ctx.stroke();
// }
// ConstantNumber.prototype.onDrawBackground = function (ctx) {
//   ctx.fillStyle = '#0d9F';
//   roundedRect(ctx, 12, 12, 150, 150, 15);
//   roundedRect(ctx, 19, 19, 150, 150, 9);
//   roundedRect(ctx, 53, 53, 49, 33, 10);
//   roundedRect(ctx, 53, 119, 49, 16, 6);
//   roundedRect(ctx, 135, 53, 49, 33, 10);
//   roundedRect(ctx, 135, 119, 25, 49, 10);

//   ctx.beginPath();
//   ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
//   ctx.lineTo(31, 37);
//   ctx.fill();

//   for (let i = 0; i < 8; i++) {
//     ctx.fillRect(51 + i * 16, 35, 4, 4);
//   }

//   for (let i = 0; i < 6; i++) {
//     ctx.fillRect(115, 51 + i * 16, 4, 4);
//   }

//   for (let i = 0; i < 8; i++) {
//     ctx.fillRect(51 + i * 16, 99, 4, 4);
//   }

//   ctx.beginPath();
//   ctx.moveTo(83, 116);
//   ctx.lineTo(83, 102);
//   ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
//   ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
//   ctx.lineTo(111, 116);
//   ctx.lineTo(106.333, 111.333);
//   ctx.lineTo(101.666, 116);
//   ctx.lineTo(97, 111.333);
//   ctx.lineTo(92.333, 116);
//   ctx.lineTo(87.666, 111.333);
//   ctx.lineTo(83, 116);
//   ctx.fill();

//   ctx.fillStyle = 'white';
//   ctx.beginPath();
//   ctx.moveTo(91, 96);
//   ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
//   ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
//   ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
//   ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
//   ctx.moveTo(103, 96);
//   ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
//   ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
//   ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
//   ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
//   ctx.fill();

//   ctx.fillStyle = 'black';
//   ctx.beginPath();
//   ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
//   ctx.fill();

//   ctx.beginPath();
//   ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
//   ctx.fill();
// };

LiteGraph.registerNodeType('basic/constNumber', ConstantNumber);

export default ConstantNumber;

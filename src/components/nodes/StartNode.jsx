//стартовый блок;
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора узла
function StartNode() {
  //свойства
  this.time = 0;
  this.title = 'Блок';
  this.triggered = false;
  this.last_interval = 3000;
  this.addProperty('event', 'tick');
  // свойства для SideMenuProperties
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', '');
  this.addProperty('flags', '');
  this.addProperty('interval', 0);
  this.addProperty('checkbox', false);
}

// Для теста таймера
StartNode.on_color = '#F8D568';
StartNode.off_color = '#222';

StartNode.prototype.onStart = function () {
  this.time = 0;
};

StartNode.prototype.onExecute = function () {
  const dt = this.graph.elapsed_time * 1000; //in ms

  const trigger = this.time == 0;

  this.time += dt;
  this.last_interval = Math.max(1, this.getInputOrProperty('interval') | 0);

  // инородное
  const inputInterval = this.getInputData(0);
  if (inputInterval !== undefined && !isNaN(inputInterval)) {
    this.last_interval = Math.max(1, inputInterval);
  }

  if (!trigger && (this.time < this.last_interval || isNaN(this.last_interval))) {
    if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
      this.setOutputData(1, false);
    }
    return;
  }

  this.triggered = true;
  this.time = this.time % this.last_interval;
  if (this.outputs && this.properties) {
    this.trigger(this.outputs.name, this.properties.event);
  }
  if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
    this.setOutputData(1, true);
  }
  // this.outputs.map((output, index) => {
  //   if (output.type === -1) {
  //     this.setOutputData(1, false);
  //   }
  //   if (output.type === 'number') {
  //     this.setOutputData(index, this.getInputOrProperty('interval') | 0);
  //   }
  // });
};

StartNode.prototype.onGetInputs = function () {
  return [['interval', 'number']];
};

StartNode.prototype.onGetOutputs = function () {
  return [['tick', 'boolean']];
};

// Отображение порядка выполнения
StartNode.prototype.onDrawForeground = function (ctx) {
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
LiteGraph.registerNodeType('basic/base', StartNode);

export default StartNode;

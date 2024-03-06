//функция таймера
import { LiteGraph } from 'litegraph.js';

function TimerEvent() {
  this.addProperty('Интервал', 3000);
  this.addProperty('event', 'tick');
  this.addInput('Интервал', 'number');
  this.addOutput('Выход', LiteGraph.EVENT); // on_tick
  this.time = 0;
  this.last_interval = 3000;
  this.triggered = false;
  // свойства для SideMenuProperties
  this.addProperty('workDir', '');
  this.addProperty('binaryFile', '');
  this.addProperty('cores', '');
  this.addProperty('flags', '');
  this.addProperty('checkbox', false);
}

TimerEvent.title = 'Таймер';
TimerEvent.desc = 'Отправляет соботие каждые N миллисекунд';

TimerEvent.prototype.onStart = function () {
  this.time = 0;
};

TimerEvent.prototype.getTitle = function () {
  return 'Таймер: ' + this.last_interval.toString() + 'ms';
};

TimerEvent.on_color = '#AAA';
TimerEvent.off_color = '#222';

TimerEvent.prototype.onDrawBackground = function () {
  this.boxcolor = this.triggered ? TimerEvent.on_color : TimerEvent.off_color;
  this.triggered = false;
};

TimerEvent.prototype.onExecute = function () {
  const dt = this.graph.elapsed_time * 1000; //in ms

  const trigger = this.time == 0;

  this.time += dt;
  this.last_interval = Math.max(1, this.getInputOrProperty('Интервал') | 0);

  if (!trigger && (this.time < this.last_interval || isNaN(this.last_interval))) {
    if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
      this.setOutputData(1, false);
    }
    return;
  }

  this.triggered = true;
  this.time = this.time % this.last_interval;
  this.trigger('Выход', this.properties.event); // on_tick
  if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
    this.setOutputData(1, true);
  }
};

TimerEvent.prototype.onGetInputs = function () {
  return [['interval', 'number']];
};

TimerEvent.prototype.onGetOutputs = function () {
  return [['tick', 'boolean']];
};

LiteGraph.registerNodeType('basic/timer', TimerEvent);

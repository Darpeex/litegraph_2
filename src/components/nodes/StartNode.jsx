//стартовый блок;
import { LiteGraph } from 'litegraph.js';
import { PATH_TO_DIR, PATH_TO_FILE } from '../../constants/constants';

//функция класса конструктора узла
function StartNode() {
  //свойства
  this.title = 'Блок';
  this.properties = { precision: 1 };
  this.render_execution_order = true; // отслеживание порядка выполнения узлов в графе (true по умолчанию)
  // свойства для SideMenuProperties
  this.addProperty('workDir', PATH_TO_DIR);
  this.addProperty('binaryFile', PATH_TO_FILE);
  this.addProperty('cores', '');
  this.addProperty('flags', '');
  this.addProperty('checkbox', false);
}

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

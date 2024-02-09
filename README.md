# litegraph_2

### Описание

Схемный построитель для диплома

- JavaScript
- React
- MUI

### Инструкция по развёртыванию.

1. Скачать архив из ветки `level-1` репозитория `https://github.com/Darpeex/litegraph_2`
2. Разпаковать и открыть папку с проектом в редакторе кода
3. Открыть терминал и прописать: `npm install`
4. Запустить проект, в терминале: `npm run start`

### Планы по доработке проекта.

- добавить возможность изменять свойства, например, в модальном окне
- добавить футер с документацией (описанием) основных действий
- доработать дизайн интерфейса
- добавить typescript

### Документация для разработки.

#### Вывод всех уже зарегистрированных функций: `console.log(LiteGraph.registered_node_types);`

#### За отрисовку узлов на холсте отвечает _CanvasRenderingContext2D_ (обычно обозначаемого как ctx). Его свойства:

- ctx.fillStyle: Стиль заливки для фигур. Может быть строкой, представляющей цвет, или градиентом.
- ctx.strokeStyle: Стиль линии для путей. Может быть строкой, представляющей цвет, или градиентом.
- ctx.lineWidth: Толщина линии для путей.
- ctx.lineCap: Как заканчиваются линии.
- ctx.lineJoin: Как соединяются линии.
- ctx.miterLimit: Максимальный угол для miter joint.
- ctx.globalAlpha: Глобальная прозрачность.
- ctx.globalCompositeOperation: Определяет, как новые рисунки будут перекрывать ранее нарисованные рисунки.
- ctx.shadowOffsetX, ctx.shadowOffsetY: Смещение тени по горизонтали и вертикали.
- ctx.shadowBlur: Размытие тени.
- ctx.shadowColor: Цвет тени.
- ctx.font: Текущий шрифт.
- ctx.textAlign: Горизонтальное выравнивание текста.
- ctx.textBaseline: Вертикальное выравнивание текста.
- ctx.lineDashOffset: Сдвиг для пунктирной линии.
- ctx.imageSmoothingEnabled: Включение или отключение сглаживания изображений.
- ctx.direction: Направление текста.
- ctx.filter: Фильтр, применяемый к контексту рисования.

```javascript
// прописывается перед регистрацией узла
ResultNode.prototype.onDrawBackground = function (ctx) {
  this.inputs[0].label = ResultNode.toString(this.value); // Показать текущее значение
  ctx.fillStyle = '#1e88e5'; // Цвет блока
  ctx.fillRect(0, 0, this.size[0], this.size[1]); // Заливка
};
```

#### В библиотеке litegraph.js есть множество свойств, которые позволяют настраивать внешний вид узлов:

```javascript
// файл с заданными свойствами расположен в src -> components -> nodes -> nodeStyles
- LiteGraph.NODE_DEFAULT_COLOR = '#1565c0'; // Цвет шапки узла
- LiteGraph.NODE_DEFAULT_BGCOLOR = '#455a64'; // Цвет фона узла
- LiteGraph.NODE_DEFAULT_BOXCOLOR = '#607d8b'; // Цвет рамки узла
- LiteGraph.DEFAULT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)'; // Цвет тени
- LiteGraph.NODE_TITLE_COLOR = '#fff'; // Цвет текста заголовка узла
- LiteGraph.NODE_TEXT_COLOR = '#fff'; // Цвет текста в узлах
- LiteGraph.NODE_DEFAULT_SHAPE = 'round'; // Изменить форму узла
- LiteGraph.NODE_TITLE_HEIGHT = 30; // Высота заголовка узла
- LiteGraph.NODE_SLOT_HEIGHT = 15; // Высота слотов узла
- LiteGraph.NODE_WIDGET_HEIGHT = 20; // Высота виджетов узла
- LiteGraph.NODE_WIDTH = 140; // Ширина узла
- LiteGraph.NODE_MIN_WIDTH = 50; // Минимальная ширина узла
- LiteGraph.NODE_COLLAPSED_RADIUS = 10; // Радиус свернутого узла
- LiteGraph.NODE_COLLAPSED_WIDTH = 80; // Ширина свернутого узла
- LiteGraph.NODE_TEXT_SIZE = 14; // Размер текста в узлах
- LiteGraph.NODE_SUBTEXT_SIZE = 12; // Размер подтекста в узлах
- LiteGraph.DEFAULT_GROUP_FONT = 24; // Размер шрифта группы узлов
```

<!-- Ссылка на автора иконки приложения https://www.freepik.com/icon/graphic-file_803122#fromView=search&term=%D1%81%D1%85%D0%B5%D0%BC%D0%BD%D1%8B%D0%B9+%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80&track=ais&page=1&position=2&uuid=38266817-1e90-4215-9810-e15e680179a4 -->

import { useEffect, useState } from 'react';
import nodeStyles from './nodes/nodeStyles';
import AddNode from './nodes/AddNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import SubtractNode from './nodes/SubtractNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import DivideNode from './nodes/DivideNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import MultiplyNode from './nodes/MultiplyNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import ResultNode from './nodes/ResultNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import ConstantNumber from './nodes/ConstNumberNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import TimerNode from './nodes/TimerNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import StartNode from './nodes/StartNode'; // видимо, без подтяжки файла, узел не регистрируется и всё ломается
import { LGraph, LGraphCanvas } from 'litegraph.js';

// Компоненты
import Header from './Header';
import Main from './Main';

nodeStyles(); // Стили узлов по умолчанию
export const graph = new LGraph(); // Создаём граф
const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст, передаём html-элемент и graph в параметры

// Параметры фона холста
// canvas.background_color = '#fafafa';
// canvas.background_image = 'data:image/png;base64, здесь должна быть картинка в кодировке base64';
// console.log(LiteGraph.registered_node_types); // информация по зарегистрированным узлам

// Отменяем стандартное контекстное меню по двойному клику
LGraphCanvas.prototype.showSearchBox = function () {
  return false;
};
// Отменяем вызов меню по ПКМ
LGraphCanvas.prototype.processContextMenu = function () {
  return false;
};

function App() {
  const [isSideMenuPropertiesOpen, setSideMenuPropertiesOpen] = useState(false); // открыто ли боковое меню
  const [selectedNode, setSelectedNode] = useState(null); // выбранный узел с параметрами
  const [toggle, setToggle] = useState(true); // принудительное обновление интерфейса

  // При выходе с выбранного узла - закрываем меню со свойствами
  canvas.onNodeDeselected = function () {
    setSideMenuPropertiesOpen(false);
    setSelectedNode(null); // стираем введенные данные в поля выбранного узла
  };

  // Передача свойств выбранного узла в SideBar
  useEffect(() => {
    const getProperties = function (node) {
      console.log(node); // свойства узла
      setSelectedNode(node); // выбранный узел
      setSideMenuPropertiesOpen(true);
    };
    canvas.onNodeSelected = getProperties;
    // очистка обработчиков при размонтировании
    return () => {
      canvas.onNodeSelected = null;
    };
  }, []); // выполняется при монтировании и размонтировании

  // Перезадается размер окна при его изменении в браузере
  useEffect(() => {
    function resizeCanvas() {
      canvas.resize(window.innerWidth, window.innerHeight); // холст по размерам окна
      canvas.draw(true); // перерисовываем холст
    }
    // resizeCanvas при загрузке страницы и изменении размеров окна
    window.onload = resizeCanvas;
    window.onresize = resizeCanvas;
    // очистка обработчиков при размонтировании
    return () => {
      window.onload = null;
      window.onresize = null;
    };
  }, []);

  return (
    <div className="App">
      <Header graph={graph} />
      <Main
        canvas={canvas}
        toggle={toggle}
        setToggle={setToggle}
        selectedNode={selectedNode}
        isSideMenuPropertiesOpen={isSideMenuPropertiesOpen}
      />
    </div>
  );
}

export default App;

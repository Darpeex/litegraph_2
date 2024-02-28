import { useEffect, useState } from 'react';
import nodeStyles from './nodes/nodeStyles';
import AddNode from './nodes/AddNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import SubtractNode from './nodes/SubtractNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import DivideNode from './nodes/DivideNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import MultiplyNode from './nodes/MultiplyNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ResultNode from './nodes/ResultNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import ConstantNumber from './nodes/ConstNumberNode'; // видимо, без подтяжки файла, узел не регистрируется и всё крашится (не рендерится)
import SideMenuProperties from './SideMenuProperties';
import { LGraph, LiteGraph, LGraphCanvas } from 'litegraph.js';

nodeStyles(); // Стили узлов по умолчанию
export const graph = new LGraph(); // создаём граф
const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст и передаём html-элемент и graph в параметры

// Отменяем стандартное контекстное меню по двойному клику
LGraphCanvas.prototype.showSearchBox = function () {
  return false;
};

// Отменяем вызов меню по ПКМ
LGraphCanvas.prototype.processContextMenu = function () {
  return false;
};

console.log(LiteGraph.registered_node_types); // обширная информация по узлам
function Main() {
  const [isSideMenuPropertiesOpen, setSideMenuPropertiesOpen] = useState(false); // открыто ли боковое меню
  const [selectedNode, setSelectedNode] = useState(null);

  // При выходе с выбранного узла - закрываем свойства
  canvas.onNodeDeselected = function () {
    setSideMenuPropertiesOpen(false);
    setSelectedNode(null); // стираем данные введенные (но не сохраненные) в поля SideMenu
  };

  // Передача свойств выбранного узла в SideBar
  useEffect(() => {
    const getProperties = function (node) {
      setSelectedNode(node); // Сохраняем выбранный узел в состояние
      setSideMenuPropertiesOpen(true);
      console.log(node);
    };
    canvas.onNodeSelected = getProperties;
    // удаляем обработчик события при размонтировании компонента
    return () => {
      canvas.onNodeSelected = null;
    };
  }, []); // эффект выполняется при монтировании и размонтировании

  // Перезадается размер окна при его изменении в браузере
  useEffect(() => {
    function resizeCanvas() {
      canvas.resize(window.innerWidth, window.innerHeight); // Устанавливаем размеры холста равными размерам окна
      canvas.draw(true); // Перерисовываем холст
    }
    // Вызываем функцию resizeCanvas при загрузке страницы и при изменении размеров окна
    window.onload = resizeCanvas;
    window.onresize = resizeCanvas;
    // Очистка обработчиков событий
    return () => {
      window.onload = null;
      window.onresize = null;
    };
  }, []);

  graph.start(); // Запускаем график
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties
        menuOpen={isSideMenuPropertiesOpen}
        closeMenu={() => setSideMenuPropertiesOpen(false)}
        node={selectedNode ? selectedNode : null}
      />
    </main>
  );
}

export default Main;

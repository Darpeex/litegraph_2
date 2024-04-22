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
import { mainApi } from '../utils/MainApi'; // запросы на сервер
import { LGraph, LGraphCanvas } from 'litegraph.js';

// Компоненты
import Main from './Main';
import Header from './Header';
import { ModalSchemeList } from './ModalSchemeList';
import { ModalSaveSchemeForm } from './ModalSaveSchemeForm';

nodeStyles(); // Стили узлов по умолчанию
export const graph = new LGraph(); // Создаём граф
const canvas = new LGraphCanvas('#mycanvas', graph); // Создаём холст, передаём html-элемент и graph в параметры

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
  const [openModalSaveSchemeForm, setOpenModalSaveSchemeForm] = useState(false); // модальное окно сохранения
  const [openModalSchemeList, setOpenModalSchemeList] = useState(false); // молальное окно со списком схем
  const [selectedNode, setSelectedNode] = useState(null); // выбранный узел с параметрами
  const [toggle, setToggle] = useState(true); // принудительное обновление интерфейса
  // состояния для схем
  const [schemesFromDB, setSchemesFromDB] = useState([]);

  // Получение схем с сервера
  useEffect(() => {
    mainApi
      .getSchemes() // получаем схемы
      .then((data) => {
        console.log(data);
        setSchemesFromDB(data); // обновляем список схем
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  // Закрываем меню со свойствами
  const onNodeDeselected = () => {
    setSideMenuPropertiesOpen(false);
    setSelectedNode(null); // стираем введенные данные в поля выбранного узла
  };
  // При выходе с выбранного узла - закрываем меню со свойствами
  canvas.onNodeDeselected = onNodeDeselected;

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
      <ModalSaveSchemeForm
        openModalSaveSchemeForm={openModalSaveSchemeForm}
        setOpenModalSaveSchemeForm={setOpenModalSaveSchemeForm}
      />
      <ModalSchemeList
        schemesFromDB={schemesFromDB}
        openModalSchemeList={openModalSchemeList}
        setOpenModalSchemeList={setOpenModalSchemeList}
      />
      <Header
        graph={graph}
        canvas={canvas}
        onNodeDeselected={onNodeDeselected}
        setOpenModalSchemeList={setOpenModalSchemeList}
        setOpenModalSaveSchemeForm={setOpenModalSaveSchemeForm}
      />
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

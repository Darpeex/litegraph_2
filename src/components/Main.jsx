import SideMenuProperties from './SideMenuProperties/SideMenuProperties';

function Main({ canvas, selectedNode, isSideMenuPropertiesOpen, toggle, setToggle }) {
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties
        canvas={canvas}
        toggle={toggle}
        setToggle={setToggle}
        node={selectedNode ? selectedNode : null}
        menuOpen={isSideMenuPropertiesOpen}
      />
    </main>
  );
}

export default Main;

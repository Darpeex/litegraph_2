import SideMenuProperties from './SideMenuProperties/SideMenuProperties';

function Main({ canvas, selectedNode, isSideMenuPropertiesOpen }) {
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties
        canvas={canvas}
        node={selectedNode ? selectedNode : null}
        menuOpen={isSideMenuPropertiesOpen}
      />
    </main>
  );
}

export default Main;

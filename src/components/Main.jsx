import SideMenuProperties from './SideMenuProperties';

function Main({ selectedNode, isSideMenuPropertiesOpen, canvas }) {
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties
        node={selectedNode ? selectedNode : null}
        menuOpen={isSideMenuPropertiesOpen}
        canvas={canvas}
      />
    </main>
  );
}

export default Main;

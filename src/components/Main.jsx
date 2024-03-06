import SideMenuProperties from './SideMenuProperties';

function Main({ selectedNode, isSideMenuPropertiesOpen }) {
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties node={selectedNode ? selectedNode : null} menuOpen={isSideMenuPropertiesOpen} />
    </main>
  );
}

export default Main;

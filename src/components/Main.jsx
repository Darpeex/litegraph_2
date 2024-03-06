import SideMenuProperties from './SideMenuProperties';

function Main({ selectedNode, isSideMenuPropertiesOpen }) {
  return (
    <main className="Main">
      <div className="page"></div>
      <SideMenuProperties menuOpen={isSideMenuPropertiesOpen} node={selectedNode ? selectedNode : null} />
    </main>
  );
}

export default Main;

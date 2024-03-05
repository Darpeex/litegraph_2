import SideMenuProperties from './SideMenuProperties';

function Main({ selectedNode, isSideMenuPropertiesOpen, setSideMenuPropertiesOpen }) {
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

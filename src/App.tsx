import React, { useState } from "react";
import Drawer from "./Drawer";

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <button onClick={toggleDrawer}>Toggle Drawer</button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <main style={{ padding: "20px" }}>
        <h1>Main Content</h1>
        <p>This is the main content of the app.</p>
      </main>
    </div>
  );
};

export default App;

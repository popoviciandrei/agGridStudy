import React from "react";

import BasicGrid from "./grids/BasicGrid";

const App = (): React.JSX.Element => {
  return (
    <div className="bg-slate-100">
      {/* Header Section */}
      <h1>Vite + React + AG Grid + TypeScript + Tailwind</h1>

      <BasicGrid />
    </div>
  );
};

export default App;

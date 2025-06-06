import React, { useState } from "react";

import BasicGrid from "./grids/BasicGrid";

const App = (): React.JSX.Element => {
  const [selectedGrid, setSelectedGrid] = useState<string | undefined>();

  const renderGrid = () => {
    switch (selectedGrid) {
      case "basic":
        return <BasicGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-100 h-screen full">
      {/* Header Section */}
      <h1 className="text-3xl font-bold underline text-center mb-4">
        Vite + React + AG Grid + TypeScript + Tailwind
      </h1>

      <div className="mb-4 flex justify-center items-center gap-4">
        <label htmlFor="grid-select">
          <strong>Select Grid Example:</strong>
        </label>
        <select
          value={selectedGrid}
          onChange={(e) => setSelectedGrid(e.target.value)}
          className="p-2 border rounded"
        >
          <option>-</option>
          <option value="basic">01. Basic Grid</option>
        </select>
      </div>
      {renderGrid()}
    </div>
  );
};

export default App;

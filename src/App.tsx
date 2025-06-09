import React, { useState, Suspense, lazy } from 'react';
import Grids from './grids';

const App = (): React.JSX.Element => {
  const [selectedGrid, setSelectedGrid] = useState<string>('grids');

  const RenderGrid = () => {
    switch (selectedGrid) {
      case 'grids':
        return <Grids />;
      case 'charts':
      // return <EnterpriseGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-100 h-screen full">
      {/* Header Section */}
      <h1 className="text-3xl font-bold underline text-center mb-4">Vite + React + AG Grid + TypeScript + Tailwind</h1>

      <div className="mb-4 flex justify-center items-center gap-4">
        <label htmlFor="grid-select">
          <strong>Select AG Grid Examples:</strong>
        </label>
        <select value={selectedGrid} onChange={(e) => setSelectedGrid(e.target.value)} className="p-2 border rounded">
          <option>-</option>
          <option value="grids">Grids</option>
          <option value="charts">Charts</option>
        </select>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderGrid />
      </Suspense>
    </div>
  );
};

export default App;

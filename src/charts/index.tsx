import { Suspense, useState } from 'react';
import BasicBarLinear from './BasicBarLinear';

const Charts = () => {
  const [selectedGrid, setSelectedGrid] = useState<string>('basic');

  const RenderGrid = () => {
    switch (selectedGrid) {
      case 'basic':
        return <BasicBarLinear />;
      default:
        return null;
    }
  };
  return (
    <>
      <div id="my-chart" className="w-full" />
      <div>
        <div className="mb-4 flex  items-center gap-4 m-4">
          <label htmlFor="grid-select">
            <strong>Select Grid Example:</strong>
          </label>
          <select value={selectedGrid} onChange={(e) => setSelectedGrid(e.target.value)} className="p-2 border rounded">
            <option>-</option>
            <option value="basic">01. Basic Bar Linear</option>
          </select>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderGrid />
        </Suspense>
      </div>
    </>
  );
};

export default Charts;

import { useState, Suspense, lazy } from 'react';

const BasicGrid = lazy(() => import('./BasicGrid'));
const EnterpriseGrid = lazy(() => import('./EnterpriseGrid'));
const CustomCells = lazy(() => import('./CustomCells'));
const AvoidWastedRenders = lazy(() => import('./AvoidWastedRenders'));
const BuiltInColumnFilters = lazy(() => import('./BuiltInColumnFilters'));
const CustomFilterReactComponents = lazy(() => import('./CustomFilterReactComponents'));
const CustomFloatingFilter = lazy(() => import('./CustomFloatingFilter'));
const CustomReactComponents = lazy(() => import('./CustomReactComponents'));
const UpdateGrid = lazy(() => import('./UpdateGrid'));
const ColumnReactDefinitions = lazy(() => import('./ColumnReactDefinitions'));
const ConfigureGridCoumnsWithReatStateAndGridAPI = lazy(() => import('./ConfigureGridCoumnsWithReatStateAndGridAPI'));

export const Grids = () => {
  const [selectedGrid, setSelectedGrid] = useState<string>('basic');

  const RenderGrid = () => {
    switch (selectedGrid) {
      case 'basic':
        return <BasicGrid />;
      case 'enterprise':
        return <EnterpriseGrid />;
      case 'custom-cells':
        return <CustomCells />;
      case 'avoid-wasted-renders':
        return <AvoidWastedRenders />;
      case 'built-in-column-filters':
        return <BuiltInColumnFilters />;
      case 'custom-filter-react-components':
        return <CustomFilterReactComponents />;
      case 'custom-floating-filter':
        return <CustomFloatingFilter />;
      case 'custom-react-components':
        return <CustomReactComponents />;
      case 'update-grid':
        return <UpdateGrid />;
      case 'column-react-definitions':
        return <ColumnReactDefinitions />;
      case 'configure-grid-coumns-with-reat-state-and-grid-api':
        return <ConfigureGridCoumnsWithReatStateAndGridAPI />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 m-4">
        <label htmlFor="grid-select">
          <strong>Select Grid Example:</strong>
        </label>
        <select value={selectedGrid} onChange={(e) => setSelectedGrid(e.target.value)} className="p-2 border rounded">
          <option>-</option>
          <option value="basic">01. Basic Grid</option>
          <option value="enterprise">02. Enterprise Grid</option>
          <option value="custom-cells">03. Custom Cells</option>
          <option value="avoid-wasted-renders">04. Avoid Wasted Renders</option>
          <option value="built-in-column-filters">05. Built-in Column Filters</option>
          <option value="custom-filter-react-components">06. Custom Filter React Components</option>
          <option value="custom-floating-filter">07. Custom Floating Filter</option>
          <option value="custom-react-components">08. Custom React Components</option>
          <option value="update-grid">09. Update Grid</option>
          <option value="column-react-definitions">10. Column React Definitions</option>
          <option value="configure-grid-coumns-with-reat-state-and-grid-api">
            11. Configure Grid Coumns With Reat State And Grid API
          </option>
        </select>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderGrid />
      </Suspense>
    </div>
  );
};

export default Grids;

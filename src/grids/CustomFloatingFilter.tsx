import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { themeQuartz as theme } from 'ag-grid-community';
import type { ColDef, IFilterParams } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

import MyFloatingFilter from './customfilters/MyFloatingFilter';
import MyFilter from './customfilters/MyFilter';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const CustomFloatingFilter = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
    },
    {
      field: 'year',
      filter: MyFilter,
      floatingFilterComponent: MyFloatingFilter,
      floatingFilter: true,
      // suppressFloatingFilterButton: true,
    },
    { field: 'age', filter: true },
    { field: 'country' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      // filter: true,
      // enableRowGroup: true,
    }),
    [],
  );

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="w-full h-[500px]">
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        rowGroupPanelShow="always"
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
        theme={theme}
      />
    </div>
  );
};

export default CustomFloatingFilter;

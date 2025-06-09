import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ICellRendererParams } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const SimpleCellRenderer = (params: ICellRendererParams & { buttonText?: string }) => {
  const onAtClick = () => {
    console.log('At clicked');
  };

  return (
    <div>
      <button onClick={onAtClick} className="mx-1 p-1">
        Push
      </button>
      {params.value}
    </div>
  );
};

const CustomCells = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      cellRenderer: SimpleCellRenderer,
    },
    {
      field: 'age',
      cellRenderer: SimpleCellRenderer,
    },
    { field: 'country' },
    { field: 'year' },
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
      filter: true,
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
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CustomCells;

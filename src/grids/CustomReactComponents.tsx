import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { HelloWorld, GoodByeWorld } from './components';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const CustomReactComponents = () => {
  const components = useMemo(() => {
    return {
      cellRenderer: HelloWorld,
      filter: GoodByeWorld,
      headerComponent: HelloWorld,
    };
  }, []);

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      cellRenderer: HelloWorld,
      cellRendererParams: { name: 'cellRendererParams' },
      editable: true,
      cellEditor: GoodByeWorld,
      cellEditorParams: { name: 'cellEditorParams' },
    },
    {
      field: 'age',
      filter: HelloWorld,
      filterParams: { name: 'filterParams' },
      cellRenderer: 'filter',
      cellRendererParams: { name: 'custom cell renderer' },
      floatingFilter: true,
      floatingFilterComponent: HelloWorld,
      floatingFilterComponentParams: { name: 'floatingFilterComponentParams' },
    },
    {
      field: 'country',
      headerComponent: HelloWorld,
      headerComponentParams: { name: 'headerComponentParams' },
    },
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
      enableRowGroup: true,
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
        noRowsOverlayComponent={HelloWorld}
        noRowsOverlayComponentParams={{ name: 'Susan no rows' }}
        loadingOverlayComponent={GoodByeWorld}
        loadingOverlayComponentParams={{ name: 'Susan loading' }}
        statusBar={{
          statusPanels: [
            {
              statusPanel: HelloWorld,
              statusPanelParams: { name: 'Susan status 1' },
            },
            {
              statusPanel: GoodByeWorld,
              statusPanelParams: { name: 'Susan status 2' },
            },
          ],
        }}
        sideBar={{
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'ColumnsToolPanel',
              labelKey: 'columnsToolPanel',
              iconKey: 'columnsToolPanel',
              toolPanel: 'agColumnsToolPanel',
              toolPanelParams: { name: 'Susan tool panel' },
            },
            {
              id: 'filters',
              labelDefault: 'FiltersToolPanel',
              labelKey: 'filtersToolPanel',
              iconKey: 'filtersToolPanel',
              toolPanel: HelloWorld,
              toolPanelParams: { name: 'Susan tool panel' },
            },

            // labelDefault: "Columns",
            // toolPanel: "agColumnsToolPanel",
            // },
            // {
            //   id: "3",
            //   labelDefault: "Columns",
            //   toolPanel: "agColumnsToolPanel",
            // },
            // {
            //   id: "1",
            //   labelDefault: "Columns 1",
            //   toolPanel: HelloWorld,
            //   toolPanelParams: { name: "Susan tool panel 1" },
            // },
          ],
        }}
        components={components}
        rowData={rowData}
        rowGroupPanelShow="always"
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CustomReactComponents;

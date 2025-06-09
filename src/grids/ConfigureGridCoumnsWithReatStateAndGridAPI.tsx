import { AllCommunityModule, ColumnState, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useCallback, useRef, useState } from 'react';

import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const ConfigureGridCoumnsWithReatStateAndGridAPI = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();

  const [includeMedals, setIncludeMedals] = useState(true);
  const [capHeaders, setCapHeaders] = useState(false);
  const [agePinned, setAgePinned] = useState<'left' | 'right' | null>(null);

  const savedColState = useRef<ColumnState[]>([]);

  const columnDefs = useMemo(
    () => [
      {
        colId: 'athlete',
        field: 'athlete',
        // or via a getter:
        // valueGetter: (params: any) => {
        //   return params.data.athlete;
        // },
        // initialWidth: ,
        headerName: capHeaders ? 'Athlete' : 'athlete',
      },
      { field: 'age', headerName: capHeaders ? 'Age' : 'age', pinned: agePinned },
      { field: 'country', headerName: capHeaders ? 'Country' : 'country' },
      { field: 'year', headerName: capHeaders ? 'Year' : 'year' },
      { field: 'date', headerName: capHeaders ? 'Date' : 'date' },
      { field: 'sport', headerName: capHeaders ? 'Sport' : 'sport' },
      {
        field: 'gold',
        hide: !includeMedals,
        headerName: capHeaders ? 'Gold' : 'gold',
      },
      {
        field: 'silver',
        hide: !includeMedals,
        headerName: capHeaders ? 'Silver' : 'silver',
      },
      {
        field: 'bronze',
        hide: !includeMedals,
        headerName: capHeaders ? 'Bronze' : 'bronze',
      },
      {
        field: 'total',
        hide: !includeMedals,
        headerName: capHeaders ? 'Total' : 'total',
      },
    ],
    [includeMedals, capHeaders, agePinned],
  );

  const defaultColDef = useMemo(
    () => ({
      // width: 100,
      resizable: true,
    }),
    [],
  );

  const toggleMedals = () => {
    setIncludeMedals(!includeMedals);
  };

  const toggleCapHeaders = () => {
    setCapHeaders(!capHeaders);
  };

  const onAgePinned = (value: 'left' | 'right' | null) => {
    setAgePinned(value);
  };

  const onSaveColState = useCallback(() => {
    const colState = gridRef.current?.api.getColumnState();
    console.log(colState);
    savedColState.current = colState || [];
  }, []);

  const onRestoreColState = () => {
    if (savedColState.current) {
      console.log(savedColState.current);
      gridRef.current?.api.applyColumnState({ state: savedColState.current });
    }
  };

  const onSortGoldSilver = () => {
    gridRef.current?.api.applyColumnState({
      state: [
        { colId: 'gold', sort: 'asc', sortIndex: 1 },
        { colId: 'silver', sort: 'asc', sortIndex: 2 },
        { colId: 'bronze', sort: 'asc', sortIndex: 3 },
        { colId: 'total', sort: 'asc', sortIndex: 4 },
      ],
      defaultState: { sort: null },
      applyOrder: true,
    });
  };

  const onWidth100 = () => {
    gridRef.current?.api.applyColumnState({
      state: [
        { colId: 'athlete', width: 100 },
        {
          colId: 'age',
          width: 100,
        },
        {
          colId: 'country',
          sort: 'asc',
        },
      ],
      defaultState: { sort: null, width: 300 },
    });
  };

  const onGrouping = () => {
    gridRef.current?.api.applyColumnState({
      state: [
        { colId: 'athlete', rowGroupIndex: 1, hide: true },
        { colId: 'country', rowGroupIndex: 0, hide: true },
        { colId: 'total', aggFunc: 'sum' },
        { colId: 'gold', aggFunc: 'sum' },
        { colId: 'silver', aggFunc: 'sum' },
        { colId: 'bronze', aggFunc: 'sum' },
      ],
      applyOrder: true,
    });
  };

  const onGroupViaApi = () => {
    gridRef.current?.api.setRowGroupColumns(['country', 'athlete']);
    gridRef.current?.api.setColumnsVisible(['country', 'athlete'], false);
    gridRef.current?.api.setValueColumns(['total', 'gold', 'silver', 'bronze']);
    gridRef.current?.api.setColumnAggFunc('total', 'sum');
    gridRef.current?.api.setColumnAggFunc('gold', 'sum');
    gridRef.current?.api.setColumnAggFunc('silver', 'sum');
    gridRef.current?.api.setColumnAggFunc('bronze', 'sum');
  };

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="w-full h-[500px]">
      <div className="flex flex-col gap-2 m-2">
        <div className="flex flex-row gap-2">
          <button
            onClick={toggleMedals}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Toggle Medals
          </button>
          <button
            onClick={toggleCapHeaders}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 cursor-pointer"
          >
            Toggle Cap Headers
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center">
          Set Age Pinned:
          <button
            onClick={() => onAgePinned('left')}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Left
          </button>
          <button
            onClick={() => onAgePinned('right')}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Right
          </button>
          <button
            onClick={() => onAgePinned(null)}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Unpin
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={onSaveColState}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Save Col State
          </button>
          <button
            onClick={onRestoreColState}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 cursor-pointer"
          >
            Restore Col State
          </button>
          <button
            onClick={onWidth100}
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 cursor-pointer"
          >
            Width 100
          </button>
          <button
            onClick={onSortGoldSilver}
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            Sort Medals Columns
          </button>
          <button
            onClick={onGrouping}
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            Grouping
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={onGroupViaApi}
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            Group Via API
          </button>
        </div>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        maintainColumnOrder={true}
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

export default ConfigureGridCoumnsWithReatStateAndGridAPI;

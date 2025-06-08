import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ValueGetterParams,
  ValueFormatterParams,
  ColDef,
  ITooltipParams,
  ColGroupDef,
} from "ag-grid-community";
import { themeBalham as theme } from "ag-grid-community";

import { AllEnterpriseModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const ColumnReactDefinitions = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Competitor",
      field: "athlete",
      flex: 2,
      valueGetter: (params: ValueGetterParams) => {
        return params.data.athlete;
      },
      valueFormatter: (params: ValueFormatterParams) => {
        return "[ " + params.value + " ]";
      },
      pinned: "left",
      // lockPinned: true,
      // hide: true,
      tooltipField: "country",
      headerTooltip: "Country of the competitor",
    },
    {
      field: "age",
      tooltipValueGetter: (params: ITooltipParams) => {
        return params.data.age + " years old";
      },
    },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    {
      headerName: "Medals",
      children: [
        { field: "total" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
      ],
    },
    // { field: "gold" },
    // { field: "silver" },
    // { field: "bronze" },
    // { field: "total" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      editable: true,
      sortable: true,
      // flex: 1,
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onPushMe = () => {
    const allColumns = gridRef.current?.api.getColumns();
    const displayedColumns = gridRef.current?.api.getAllDisplayedColumns();
    console.log(allColumns);
    console.log(displayedColumns);
    // const newColumnDefs = [...columnDefs, { field: "pushMe" }];
    // setColumnDefs(newColumnDefs);
  };

  return (
    <div className="w-full h-[500px]">
      <div className="flex flex-row gap-2 p-2">
        <button
          onClick={onPushMe}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Push Me
        </button>
      </div>
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

export default ColumnReactDefinitions;

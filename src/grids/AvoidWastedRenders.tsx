import { useEffect, useMemo, memo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ICellRendererParams,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const MyComp = (params: ICellRendererParams) => {
  const renderCountRef = useRef(1);

  return (
    <>
      <b>({renderCountRef.current++})</b> - {params.value}
    </>
  );
};

const AvoidWastedRenders = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      cellRenderer: memo(MyComp),
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
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

export default AvoidWastedRenders;

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  FilterModel,
} from "ag-grid-community";

import { themeAlpine as theme } from "ag-grid-community";

import { AllEnterpriseModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  AllCommunityModule,
  AllEnterpriseModule,
  //   ContextMenuModule,
]);

const BuiltInColumnFilters = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "athlete",
      filter: "agTextColumnFilter",
    },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "country", filter: "agMultiColumnFilter" },
    { field: "year", filter: "agMultiColumnFilter" },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (dateFromFilter: Date, cellValue: string) => {
          if (cellValue === null) {
            return 0;
          }

          const dateParts = cellValue.split("/");
          const day = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1;
          const year = parseInt(dateParts[2]);

          const cellDate = new Date(year, month, day);

          if (cellDate < dateFromFilter) {
            return -1;
          } else if (cellDate > dateFromFilter) {
            return 1;
          }

          return 0;
        },
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
      flex: 1,
      filterParams: {
        debounceMs: 0,
        buttons: ["apply", "clear", "reset"],
      },
      floatingFilter: true,
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const savedFiltersState = useRef<FilterModel | null>(null);

  const onBtnSave = useCallback(() => {
    const filterModel = gridRef.current?.api?.getFilterModel();
    console.log("Saving filter model", filterModel);
    savedFiltersState.current = filterModel ?? null;
  }, []);
  const onBtnApply = useCallback(() => {
    const filterModel = savedFiltersState.current;
    console.log("Applying filter model", filterModel);
    gridRef.current?.api?.setFilterModel(filterModel);
  }, []);

  return (
    <div className="w-full h-[500px]">
      <div>
        <div className="flex gap-2 mb-2">
          <button
            onClick={onBtnApply}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Apply Filters
          </button>
          <button
            onClick={onBtnSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
          >
            Save Filters
          </button>
        </div>
      </div>
      <AgGridReact
        popupParent={document.body}
        theme={theme}
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

export default BuiltInColumnFilters;

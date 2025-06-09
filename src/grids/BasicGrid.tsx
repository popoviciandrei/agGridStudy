import React, { useState, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  AllCommunityModule,
  //   ICellRendererParams,
} from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Car {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// const MyCellComponent = (props: ICellRendererParams) => {
//   return (
//     <>
//       <button onClick={() => window.alert("action")}>+</button>{" "}
//       <span>{props.value}</span>
//     </>
//   );
// };

const myTheme = themeQuartz; //.withPart(colorSchemeDarkBlue).withParams({});

const BasicGrid = (): React.JSX.Element => {
  // Row Data to be displayed in the grid
  const [rowDate, setRowDate] = useState<Car[]>([
    { make: 'Toyota', model: 'Corolla', price: 20000, electric: false },
    { make: 'Toyota', model: 'Camry', price: 25000, electric: false },
    { make: 'Toyota', model: 'RAV4', price: 28000, electric: true },
    { make: 'Ford', model: 'Mustang', price: 30000, electric: true },
    { make: 'Ford', model: 'F-150', price: 35000, electric: false },
    { make: 'Ford', model: 'Explorer', price: 32000, electric: false },
    { make: 'Chevrolet', model: 'Camaro', price: 40000, electric: false },
    { make: 'Chevrolet', model: 'Malibu', price: 22000, electric: false },
    { make: 'Chevrolet', model: 'Bolt', price: 26000, electric: true },
    { make: 'Tesla', model: 'Model 3', price: 50000, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 55000, electric: true },
    { make: 'Tesla', model: 'Model S', price: 75000, electric: true },
    { make: 'Nissan', model: 'Leaf', price: 25000, electric: true },
    { make: 'Nissan', model: 'Altima', price: 24000, electric: false },
    { make: 'Nissan', model: 'Rogue', price: 27000, electric: false },
    { make: 'BMW', model: 'i3', price: 35000, electric: true },
    { make: 'BMW', model: '3 Series', price: 42000, electric: false },
    { make: 'BMW', model: 'X5', price: 65000, electric: false },
    { make: 'Mercedes-Benz', model: 'EQS', price: 60000, electric: true },
    { make: 'Mercedes-Benz', model: 'C-Class', price: 45000, electric: false },
    { make: 'Mercedes-Benz', model: 'GLC', price: 48000, electric: false },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      floatingFilter: true,
      editable: true,
    }),
    [],
  );

  // Column Definitions to be displayed in the grid
  const [colDefs, setColDefs] = useState<ColDef<Car>[]>([
    {
      field: 'make',
      // cellRenderer: MyCellComponent,
      // cellEditor: "agSelectCellEditor",
      // cellEditorParams: { values: ["Toyota", "Ford", "Tesla", "Nissan", "BMW", "Mercedes-Benz"],},
    },
    { field: 'model' },
    {
      field: 'price',
      valueFormatter: (param) => `£${param.value.toLocaleString()}`,
    },
    { field: 'electric' },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-8 text-center bg-slate-100">
      {/* Header Section */}
      <div style={{ height: 500 }}>
        <AgGridReact<Car>
          theme={myTheme}
          rowData={rowDate}
          rowSelection={{
            mode: 'multiRow',
            checkboxes: true,
          }}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default BasicGrid;

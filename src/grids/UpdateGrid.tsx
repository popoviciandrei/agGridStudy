import React, { useState, useMemo, useCallback, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, GetRowIdParams, RowNode } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ItemData {
  id: number;
  type: string;
  year: number;
  color: string;
  price: number;
}

const formatCurrency = (value: number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
const myTheme = themeQuartz;

const generateNewRecord = () => {
  return {
    type: ['Car', 'Truck', 'SUV', 'Motorcycle', 'Van', 'Convertible', 'Sedan', 'Coupe', 'Hatchback', 'Wagon'][
      Math.floor(Math.random() * 10)
    ],
    year: Math.floor(Math.random() * (2024 - 2020 + 1)) + 2020,
    color: ['Red', 'Blue', 'Black', 'Green', 'White', 'Yellow', 'Silver', 'Orange', 'Purple', 'Brown'][
      Math.floor(Math.random() * 10)
    ],
    price: Math.floor(Math.random() * 10000),
    id: Math.floor(Math.random() * 1000000),
  };
};

const UpdateGrid = (): React.JSX.Element => {
  const gridRef = useRef<AgGridReact>(null);
  // Row Data to be displayed in the grid
  const [rowData, setRowData] = useState<ItemData[]>([
    generateNewRecord(),
    generateNewRecord(),
    generateNewRecord(),
    generateNewRecord(),
    generateNewRecord(),
  ]);

  // Column Definitions to be displayed in the grid
  const [colDefs, setColDefs] = useState<ColDef<ItemData>[]>([
    {
      field: 'type',
      sortable: true,
    },
    {
      field: 'year',
    },
    {
      field: 'color',
    },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: (p) => formatCurrency(p.value),
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      //   editable: true,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      //   enableCellChangeFlash: true,
    }),
    [],
  );

  const onInsertOne = useCallback(() => setRowData([...rowData, generateNewRecord()]), [rowData]);

  const onReverse = useCallback(() => setRowData([...rowData].reverse()), [rowData]);

  const onRemove = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedIds = selectedNodes?.map((node) => node.data.id);
    const newData = rowData.filter((row) => !selectedIds?.includes(row.id));
    setRowData(newData);
  }, [rowData]);

  const onUpdate = useCallback(() => {
    setRowData(
      rowData.map((row) => {
        if (Math.random() > 0.5) {
          return {
            ...row,
            price: Math.floor(Math.random() * 10000),
            color: Math.random() > 0.5 ? 'Red' : 'Blue',
          };
        }
        return row;
      }),
    );
  }, [rowData]);

  const onTxInsertOne = useCallback(() => {
    const newRecord = generateNewRecord();
    gridRef.current?.api.applyTransaction({
      add: [newRecord],
    });
  }, []);

  const onTxUpdate = () => {
    // setRowData(rowData.map((row) => ({ ...row, price: row.price + 1000 })));
    const updatedRecords: ItemData[] = [];

    gridRef.current?.api.forEachNode(({ data: row }) => {
      if (Math.random() > 0.5) {
        updatedRecords.push({
          ...row,
          price: Math.floor(Math.random() * 10000),
          color: Math.random() > 0.5 ? 'Red' : 'Blue',
        });
      }
    });

    gridRef.current?.api.applyTransaction({
      update: updatedRecords,
    });
  };

  const onTxRemove = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data);
    gridRef.current?.api.applyTransaction({
      remove: selectedData,
    });
  };

  const onTxAsyncInsertOne = () => {
    const newRecord = generateNewRecord();
    gridRef.current?.api.applyTransactionAsync(
      {
        add: [newRecord],
      },
      (res) => console.log(res),
    );
  };

  const onTxAsyncUpdate = () => {
    const updatedRecords: ItemData[] = [];

    gridRef.current?.api.forEachNode(({ data: row }) => {
      if (Math.random() > 0.5) {
        updatedRecords.push({
          ...row,
          price: Math.floor(Math.random() * 10000),
          color: Math.random() > 0.5 ? 'Red' : 'Blue',
        });
      }
    });

    gridRef.current?.api.applyTransactionAsync({
      update: updatedRecords,
    });
  };

  const onTxAsyncRemove = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data);
    gridRef.current?.api.applyTransactionAsync({
      remove: selectedData,
    });
  };

  const getRowId = useCallback(({ data }: GetRowIdParams) => data.id, []);

  const onAsyncTransactionsFlushed = useCallback(() => {
    // force the async transactions to be flushed ( executed)
    gridRef.current?.api.flushAsyncTransactions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 text-left bg-slate-100 h-[500px]">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <button
            onClick={onInsertOne}
            className="bg-blue-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300"
          >
            Insert One
          </button>
          <button
            onClick={onRemove}
            className="bg-green-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-green-600 transition-all duration-300"
          >
            Remove
          </button>
          <button
            onClick={onReverse}
            className="bg-yellow-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-yellow-600 transition-all duration-300"
          >
            Reverse
          </button>
          <button
            onClick={onUpdate}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Update some
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onTxInsertOne}
            className="bg-purple-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-purple-600 transition-all duration-300"
          >
            Tx Insert One
          </button>
          <button
            onClick={onTxRemove}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Tx Remove
          </button>
          <button
            onClick={onTxUpdate}
            className="bg-orange-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-orange-600 transition-all duration-300"
          >
            Tx Update some
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onTxAsyncInsertOne}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Tx Async Insert One
          </button>
          <button
            onClick={onTxAsyncUpdate}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Tx Async Update
          </button>
          <button
            onClick={onTxAsyncRemove}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Tx Async Remove
          </button>
          <button
            onClick={onAsyncTransactionsFlushed}
            className="bg-red-500 text-white p-2 rounded-md mb-2 cursor-pointer hover:bg-red-600 transition-all duration-300"
          >
            Flush Async Transactions
          </button>
        </div>
      </div>
      <AgGridReact<ItemData>
        ref={gridRef}
        animateRows={true}
        theme={myTheme}
        getRowId={getRowId}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection={{ mode: 'multiRow' }}
        rowData={rowData}
        asyncTransactionWaitMillis={5000}
      />
    </div>
  );
};

export default UpdateGrid;

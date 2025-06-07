import { CustomFloatingFilterProps } from "ag-grid-react";
import { useCallback, useEffect } from "react";

const MyFloatingFilter = ({
  onModelChange,
  api,
  column,
}: CustomFloatingFilterProps) => {
  const valueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onModelChange(value == "" ? null : value);
  }, []);

  const model = api.getFilterModel()[column.getColId()];

  useEffect(() => {
    console.log("Floatin filter created");
    return () => {
      console.log("Floatin filter destroyed");
    };
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1 bg-white w-full"
        value={model || ""}
        onChange={valueChanged}
        placeholder={`Filter ${column.getColDef().field}...`}
      />
    </div>
  );
};

export default MyFloatingFilter;

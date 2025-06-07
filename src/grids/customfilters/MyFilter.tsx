import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { CustomFilterProps, useGridFilter } from "ag-grid-react";
import { useCallback } from "react";

const MyFilter = ({
  model,
  onModelChange,
  getValue,
  title,
}: CustomFilterProps & { title: string }) => {
  const valueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onModelChange(value == "" ? null : value);
  }, []);

  const doesFilterPass = useCallback(
    ({ node }: IDoesFilterPassParams) => {
      const value = getValue(node);
      return value == model;
    },
    [model, getValue]
  );

  useGridFilter({ doesFilterPass });

  return (
    <>
      <h3>{title}</h3>
      <input type="text" value={model || ""} onChange={valueChanged} />
    </>
  );
};

export default MyFilter;

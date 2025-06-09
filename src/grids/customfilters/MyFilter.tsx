import { IDoesFilterPassParams } from 'ag-grid-community';
import { CustomFilterProps, useGridFilter } from 'ag-grid-react';
import { useCallback, useEffect } from 'react';

const MyFilter = ({ model, onModelChange, getValue, colDef }: CustomFilterProps & { title: string }) => {
  const valueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onModelChange(value == '' ? null : value);
  }, []);

  const doesFilterPass = useCallback(
    ({ node }: IDoesFilterPassParams) => {
      const value = getValue(node);
      return value == model;
    },
    [model, getValue],
  );

  const getModelAsString = useCallback(() => model, [model]);

  useGridFilter({ doesFilterPass, getModelAsString });

  useEffect(() => {
    console.log('Filter created');
    return () => {
      console.log('Filter destroyed');
    };
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center">
      <label className="text-sm font-bold capitalize">{colDef.field}</label>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1"
        value={model || ''}
        onChange={valueChanged}
      />
    </div>
  );
};

export default MyFilter;

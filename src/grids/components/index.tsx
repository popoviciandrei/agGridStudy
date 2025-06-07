import { ICellRendererParams } from "ag-grid-community";

export const HelloWorld = (props: ICellRendererParams & { name: string }) => {
  return <span className="text-red-500">Hello {props.name}</span>;
};

export const GoodByeWorld = (props: ICellRendererParams & { name: string }) => {
  return <span className="text-red-500">Goodbye {props.name}</span>;
};

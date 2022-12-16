import { Table, Tag } from "antd";
import { ListPDF } from "../../../../../api/ListFiles/hooks/ListPDF";
import type { ColumnsType } from "antd/es/table";
import "./ListFile.scss";
/* Defining the type of data that will be used in the table. */
interface DataType {
  key: string;
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
}
/* Defining the columns of the table. */
const columns: ColumnsType<DataType> = [
  {
    title: "Nombre Documento",
    dataIndex: "nombreDoc",
    key: "nombreDoc",
    render: (text) => <a className="text_list">{text}</a>,
  },
  {
    title: "Ruta de Documento",
    dataIndex: "rutaDoc",
    key: "rutaDoc",
  },
  {
    title: "Tipo de Documento",
    key: "extDoc",
    dataIndex: "extDoc",
    render: (_, { extDoc }) => (
      <>
        <Tag color={"volcano"} key={extDoc}>
          {extDoc.toUpperCase()}
        </Tag>
      </>
    ),
  },
];
export const ListFile = () => {
/* Destructuring the object returned by the hook. */
  const { isLoadingA, list_files } = ListPDF();
  return (
    <div className="content_list">
      <Table
        columns={columns}
        dataSource={list_files}
        rowKey="rutaDoc"
        pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
        size="large"
        loading={isLoadingA}
      />
    </div>
  );
};

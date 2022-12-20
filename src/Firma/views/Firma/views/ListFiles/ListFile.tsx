import { Table, Tag } from "antd";
import { ListPDF } from "../../../../../services/ListFiles/hooks/ListPDF";
import type { ColumnsType } from "antd/es/table";
import "./ListFile.scss";
/* Definición del tipo de datos que se utilizarán en la tabla. */
interface DataType {
  key: string;
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
}
/* Definición de las columnas de la tabla. */
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
/* Desestrucutrando el objeto devuelto por el hook. */
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

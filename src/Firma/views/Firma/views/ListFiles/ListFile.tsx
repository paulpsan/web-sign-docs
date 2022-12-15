import { Avatar, Button, List, Skeleton, Space, Table, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import "./ListFile.scss";
import axios from "axios";
import { ListPDF } from "../../../../../api/ListFiles/hooks/ListPDF";
import { StepsContext } from "../../../../../context/StepsContext/StepsContext";
interface DataType {
  key: string;
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
}
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
  const { isLoadingA, list_files } = ListPDF();
  const { current, setCurrent }: any = useContext(StepsContext);
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
      {/* <div className="button_options">
      <Button
          type="primary"
          danger
          size="large"
          onClick={() => {
            setCurrent(0);
          }}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          Siguiente
        </Button>
      </div> */}
    </div>
  );
};

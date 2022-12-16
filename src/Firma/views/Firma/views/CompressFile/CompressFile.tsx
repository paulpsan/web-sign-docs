import { useState, useContext, useEffect } from "react";
import { Button, Modal, Table, Tag } from "antd";
import { ListPDFSignature } from "../../../../../api/ListFiles/hooks/ListPDFSignature";
import type { ColumnsType } from "antd/es/table";
import FirmaContext from "../../../../../context/FirmaContext/FirmaContext";
import compressSignaturePDF from "../../../../../api/CompressFile/CompressFile";
interface DataType {
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
  base64_pdf: string;
}
export const CompressFile = () => {
/* A hook that is used to get the firma object. */
  const { firma }: any = useContext(FirmaContext);  
/* A hook that is used to list the files of a signature. */
  const { isLoadingSigature, list_files } = ListPDFSignature({ firma });
/* A state that is used to open the modal. */
  const [open, setOpen] = useState(false);
  /* A state that is an array of objects that are the columns of the table. */
  const [DataView, setDataView]: any = useState<DataType[]>([]);
/* Saving the firma object in localStorage. */
  localStorage.setItem('folder_firma', JSON.stringify(firma))
  /* A constant that is an array of objects that are the columns of the table. */
  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre Documento",
      dataIndex: "nombreDoc",
      key: "nombreDoc",
      render: (_, record) => (
        <a className="text_list" onClick={() => showModal(record)}>{record.nombreDoc}</a>
      ),
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
  /**
   * I'm going to compress the signature PDF and then download it.
   */
  const dowloadZIP = async () => {
    compressSignaturePDF(firma);
  };
  /**
   * OnCompress() is a function that sets the state of the open variable to false.
   */
  const onCompress = () => {
    setOpen(false);
  };
  /**
   * ShowModal is a function that takes a dataView as a parameter and sets the dataView state to the
   * dataView parameter and sets the open state to true.
   * @param {any} dataView - any - this is the data that is passed to the modal.
   */
  const showModal = (dataView: any) => {
    setDataView(dataView);
    setOpen(true);
  };
  return (
    <div className="content_list">
      <Table
        columns={columns}
        dataSource={list_files}
        rowKey="rutaDoc"
        pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
        size="large"
        loading={isLoadingSigature}
      />
      <div className="button_options">
        <Button type="primary" size="large" onClick={dowloadZIP}>
          Descargar Documentos
        </Button>
      </div>
      <Modal
        title="Visualizacion de Documentos Firmados"
        centered
        open={open}
        onOk={() => onCompress()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <embed
          src={`data:application/pdf;base64,${DataView.base64_pdf}`}
          width="900px"
          height="375"
        />
      </Modal>
    </div>
  );
};

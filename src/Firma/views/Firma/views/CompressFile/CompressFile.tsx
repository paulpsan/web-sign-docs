import { useState, useContext, useEffect } from "react";
import { Button, Modal, Table, Tag } from "antd";
import { ListPDFSignature } from "../../../../../services/ListFiles/hooks/ListPDFSignature";
import type { ColumnsType } from "antd/es/table";
import FirmaContext from "../../../../../context/FirmaContext/FirmaContext";
import compressSignaturePDF from "../../../../../services/CompressFile/CompressFile";
interface DataType {
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
  base64_pdf: string;
}
export const CompressFile = () => {
/* Un hook que accede al contexto en base a componentes anteriores dentro del contexto firma */
  const { firma }: any = useContext(FirmaContext);  
/* Hook para obtener la lista de los archovos PDF firmados */
  const { isLoadingSigature, list_files_signed } = ListPDFSignature({ firma });
/* Hook que controla el satado del modal. */
  const [open, setOpen] = useState(false);
  /* Hook que controla el estado de array view */
  const [DataView, setDataView]: any = useState<DataType[]>([]);
/* Guardando el objeto de firma en localStorage. */
  localStorage.setItem('folder_firma', JSON.stringify(firma))
  /* Una constante que es una matriz de objetos que son las columnas de la tabla. */
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
   * dowloadZIP es una funcionque comprimir el PDF de la firma y luego lo descarga.
   */
  const dowloadZIP = async () => {
    compressSignaturePDF(firma);
  };
  /**
   * OnCompress() es una función que establece el estado de la variable abierta en falso.
   */
  const onCompress = () => {
    setOpen(false);
  };
  /**
   * ShowModal es una función que toma un dataView como parámetro y establece el estado de dataView en el
   * dataView parámetro y establece el estado abierto en verdadero.
   * @param {any} dataView - any - estos son los datos que se pasan al modal.
   */
  const showModal = (dataView: any) => {
    setDataView(dataView);
    setOpen(true);
  };
  return (
    <div className="content_list">
      <Table
        columns={columns}
        dataSource={list_files_signed}
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

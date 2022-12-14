import { useState, useContext, useEffect } from "react";
import { Button, Modal, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import FirmaContext from "../../../../../context/FirmaContext/FirmaContext";
import compressSignaturePDF from "../../../../../api/CompressFile/CompressFile";
import { ListPDFSignature } from "../../../../../api/ListFiles/hooks/ListPDFSignature";
import { StepsContext } from "../../../../../context/StepsContext/StepsContext";
import endProccessSignature from "../../../../../api/EndProcess/EndProcess";
interface DataType {
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
  base64_pdf: string;
}
export const CompressFile = () => {
  const { firma, id_signature }: any = useContext(FirmaContext);
  const { current, setCurrent }: any = useContext(StepsContext);
  const { isLoadingSigature, list_files } = ListPDFSignature({ firma });
  const [open, setOpen] = useState(false);
  const [DataView, setDataView]: any = useState<DataType[]>([]);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [value, setValue] = useState(0);
  //const [DataZIP, setDataZIP] = useState<DataType[]>([]);
  //const [inputName, setinputName] = useState("");

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre Documento",
      dataIndex: "nombreDoc",
      key: "nombreDoc",
      render: (_, record) => (
        <a onClick={() => showModal(record)}>{record.nombreDoc}</a>
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
  const dowloadZIP = async () => {
    compressSignaturePDF(firma);
  };
  const onCompress = () => {
    setOpen(false);
  };
  const showModal = (dataView: any) => {
    setDataView(dataView);
    setOpen(true);
  };

  // const showModal_confirm = () => {
  //   setIsModalOpen(true);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // };
  // const onChange = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
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
      {/* <Button
          type="primary"
          danger
          size="large"
          onClick={() => {
            setCurrent(0);
          }}
        >
          Cancelar
        </Button> */}
        <Button type="primary" size="large" onClick={dowloadZIP}>
          Descargar Documentos
        </Button>
        {/* <Button
          type="primary"
          size="large"
          onClick={() => {
            setCurrent(0),
            endProccessSignature()
          }}
        >
          Terminar Proceso
        </Button> */}
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
      {/* <Modal
        title="Mensaje de Información"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="horizontal">
          <Tag color="green">
            <h3>
              ¿Antes de terminar el proceso, los documentos requieren otra
              firma?
            </h3>
          </Tag>
        </Space>
        <br />
        <br />
        <br />
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="horizontal">
            <Radio value={0}>NO</Radio>
            <Radio value={1}>
              SI
              {value === 1 ? (
                <Input
                  placeholder="Ingrese el nombre del usuario con firma faltante"
                  style={{ width: 200, marginLeft: 20 }}
                  onChange={(e) => setinputName(e.target.value)}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </Modal> */}
    </div>
  );
};

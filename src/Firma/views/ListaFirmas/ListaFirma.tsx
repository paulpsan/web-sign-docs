import { DownloadOutlined, FileProtectOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag } from 'antd';
import { TitlePage } from '../../../UI/components/TitlePage/TitlePage'
import type { ColumnsType } from "antd/es/table";
import "./ListaFirma.scss"
import { ListZIP } from '../../../api/ListFiles/hooks/ListZIP';
import downloadZIP from '../../../api/DownloadFile/DownloadFile';
interface DataType {
  key: string;
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
}

export const ListaFirma = () => {
/* A destructuring assignment. It is a way to extract data from arrays or objects into distinct
variables. */
  const { list_files, isLoadingZIP } = ListZIP();
  
  /* A way to extract data from arrays or objects into distinct variables. */
  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre Documento",
      dataIndex: "nombreDoc",
      key: "nombreDoc",
      render: (text) => <a className='title_text'>{text}</a>,
    },
    {
      title: "Extensión",
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
    {
      title: "Fecha de Proceso",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Tamaño del Archivo",
      dataIndex: "size_file",
      key: "size_file",
    },
    {
      title: "Tipo de Documento",
      key: "extDoc",
      dataIndex: "extDoc",
      render: (_, record) => (
        <>
          <Space>
            <Button type="primary" icon={<DownloadOutlined />} onClick={ () => { getDataFile( record.nombreDoc, record.extDoc ) } } > Descargar </Button>
          </Space>
        </>
      ),
    }
  ];
  /**
   * GetDataFile is a function that takes two arguments, nombreDoc and extDoc, and returns a function
   * that takes no arguments.
   * @param {any} nombreDoc - is the name of the file
   * @param {any} extDoc - "pdf"
   */
  const getDataFile = ( nombreDoc:any, extDoc:any ) => {
    const nameFile = nombreDoc+"."+extDoc.toLowerCase();
    downloadZIP(nameFile);
  }
  return (
    <>
      <div className="title_space">
        <TitlePage
          titleContent="Lista de Firmas"
          iconComp={<FileProtectOutlined />}
        />
      </div>
      <div className="content_list">
        <div className='content_table'>
          <Table
            columns={columns}
            dataSource={list_files}
            rowKey="fecha"
            pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
            size="large"
            loading={isLoadingZIP}
          />
        </div>
      </div>
    </>
  )
}

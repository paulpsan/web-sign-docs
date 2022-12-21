import { CloseOutlined, DownloadOutlined, FileProtectOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table, Tag } from 'antd';
import { TitlePage } from '../../../UI/components/TitlePage/TitlePage'
import { ListZIP } from '../../../services/ListFiles/hooks/ListZIP';
import { useState, useRef } from "react";
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import downloadZIP from '../../../services/DownloadFile/DownloadFile';
import Highlighter from "react-highlight-words";
type DataIndex = keyof DataType;
import "./ListaFirma.scss"
interface DataType {
  key: string;
  nombreDoc: string;
  rutaDoc: number;
  extDoc: string;
  fecha: string;
  size_file: string;
}

export const ListaFirma = () => {
  /* A destructuring assignment. It is a way to extract data from arrays or objects into distinct
  variables. */
  const { list_files, isLoadingZIP } = ListZIP();
  /**
   * GetDataFile is a function that takes two arguments, nombreDoc and extDoc, and returns a function
   * that takes no arguments.
   * @param {any} nombreDoc - is the name of the file
   * @param {any} extDoc - "pdf"
   */
  const getDataFile = (nombreDoc: any, extDoc: any) => {
    const nameFile = nombreDoc + "." + extDoc.toLowerCase();
    downloadZIP(nameFile);
  }
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={"Ingrese el nombre del ZIP."}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <div className='content_find'>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            </div>
            <div className='content_reset'>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Limpiar
              </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              <CloseOutlined />
            </Button>
            </div>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre Documento",
      dataIndex: "nombreDoc",
      key: "nombreDoc",
      render: (text) => <a className='title_text'>{text}</a>,
      ...getColumnSearchProps('nombreDoc')
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
      ...getColumnSearchProps('fecha')
    },
    {
      title: "Tamaño del Archivo",
      dataIndex: "size_file",
      key: "size_file",
    },
    {
      title: "Acción",
      key: "extDoc",
      dataIndex: "extDoc",
      render: (_, record) => (
        <>
          <Space>
            <Button type="primary" icon={<DownloadOutlined />} onClick={() => { getDataFile(record.nombreDoc, record.extDoc) }} > Descargar </Button>
          </Space>
        </>
      ),
    }
  ];



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

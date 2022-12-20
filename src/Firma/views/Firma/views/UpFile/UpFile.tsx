import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { unZipFiles } from "../../../../../services/UpFiles/UpFile";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
const { Dragger } = Upload;
import "./UpFile.scss";
export const UpFile = () => {
/* hook que controla el estado de fileList array. */
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  /**
   *Si el argumento es una matriz, devuelve el argumento. Si el argumento es un objeto, devuelve el
   * fileList propiedad del argumento.
   * @param {any} e - any -&gt; TEl evento que se activa cuando se carga el archivo.d.
   * @returns la matriz de lista de archivos.
   */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  /* Una constante que se asigna a los accesorios del componente Arrastrador. */
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  /**
   * La función unZipFiles se llama con el parámetro de valores, que es de tipo cualquiera.
   * @param {any} values - Valores abstraidos dentro del form
   */
  const onFinish = (values: any) => {
    unZipFiles(values);
  };
  return (
    <>
      <div className="verif_content">
        <Form
          name="dynamic_form_nest_item"
          className="form-zip"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          id="unzip_files"
        >
          <Form.Item
            name={"file"}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Porfavor cargue un archivo ZIP.",
              },
            ]}
          >
            <Dragger {...props} accept=".zip" maxCount={1} listType="picture">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Haga clic o arrastre el archivo a esta área para cargarlo
              </p>
              <p className="ant-upload-hint">
                Soporte para una carga única o masiva. Prohibir estrictamente
                subir datos de la empresa u otros archivos de la banda
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <div className="btn_process">
              <Button type="primary" size="large" htmlType="submit">
                Procesar Archivo
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

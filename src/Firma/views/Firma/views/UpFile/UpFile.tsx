import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { unZipFiles } from "../../../../../api/UpFiles/UpFile";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
const { Dragger } = Upload;
import "./UpFile.scss";
export const UpFile = () => {
/* A React Hook that is used to store the state of the fileList array. */
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  /**
   * If the argument is an array, return the argument. If the argument is an object, return the
   * fileList property of the argument.
   * @param {any} e - any -&gt; The event that is triggered when the file is uploaded.
   * @returns the fileList array.
   */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  /* A constant that is being assigned to the props of the Dragger component. */
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
   * The function unZipFiles is called with the values parameter, which is of type any.
   * @param {any} values - The values of the form.
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

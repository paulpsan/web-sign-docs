import { useState, useContext } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { unZipFiles } from "../../../../../api/UpFiles/UpFile";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import "./UpFile.scss";
import { StepsContext } from "../../../../../context/StepsContext/StepsContext";
const { Dragger } = Upload;

export const UpFile = () => {
  const { current, setCurrent }: any = useContext(StepsContext);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
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
  const onFinish = (values: any) => {
    unZipFiles(values);
    //setCurrent(current + 1);
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
            <Button type="primary" size="large" htmlType="submit">
              Procesar Archivo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

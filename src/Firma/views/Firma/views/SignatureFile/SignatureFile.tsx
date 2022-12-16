import { ExclamationCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space, Upload, Modal } from "antd";
import { useReducer, useState, useContext } from "react";
import { signaturePDF, StateVerific, verifSignature } from "../../../../../api/SignatureFile/SignatiureFile";
import { addSignatory } from "../../../../../api/Signatory/Signatory";
import { addSignature } from "../../../../../api/Signature/Signature";
import FirmaContext from "../../../../../context/FirmaContext/FirmaContext";
import "./SignatureFile.scss";
const { confirm } = Modal;
export const SignatureFile = () => {
/* A destructuring assignment. */
  const { setFirma }: any = useContext(FirmaContext);
/* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
function components. */
  const [messageState, setmessageState] = useState<string[]>([]);
/* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
function components. */
  const [stateFinish, setstateFinish] = useState<boolean>(false);
/* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
function components. */
  const [dataInfo, setdataInfo] = useState<Object[]>([]);
/* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
function components. */
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  /**
   * If the argument is an array, return the argument. If the argument is an object, return the
   * fileList property of the argument.
   * @param {any} e - events 
   * @returns the fileList array.
   */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  /**
   * "verificSignaure" is a function that takes in a parameter called "values" and returns a promise
   * @param {any} values - any = {
   */
  const verificSignaure = async (values: any) => {
    const verif_signature = verifSignature(values);
    verif_signature.then((resp) => {
      const data = StateVerific(resp);
      setstateFinish(data);
      setmessageState(resp);
    });
    forceUpdate();
    setdataInfo(values.users);
  };
  /**
   * ShowConfirm() is a function that displays a modal window with a title, content, and two buttons,
   * one of which calls the onSignature() function.
   */
  const showConfirm = () => {
    confirm({
      width:"500px",
      icon: <ExclamationCircleOutlined />,
      title: '¿Desea firmar estos elementos?',
      content: '!Revise el nombre de los firmantes antes de confirmar!',
      okText: "Si",
      onOk() {
        onSignature();
      },
      cancelText: "No",
      onCancel() {
      },
    });
  };
  /**
   * "onSignature" is a function that sets the state of "firma" to the length of the "dataInfo" array,
   * then calls the "signaturePDF" function, then calls the "addSignature" function, which returns a
   * promise that calls the "addSignatory" function.
   */
  const onSignature = async () => {
    setFirma(dataInfo.length);
    signaturePDF(dataInfo);
    addSignature(dataInfo.length).then((id_signature) => {
      addSignatory(dataInfo.length, id_signature);
    });
  };
  return (
    <>
      <div className="verif_content">
        <Form
          name="dynamic_form_nest_item"
          onFinish={verificSignaure}
          autoComplete="off"
          layout="vertical"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button
                    className="dashed_button"
                    type="dashed"
                    onClick={() => {
                      add(), setmessageState([]);
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Agregar Certificado
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label="Cetificado Virtual"
                      name={[name, "file"]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[
                        {
                          required: true,
                          message: "Porfavor cargue un certificado.",
                        },
                      ]}
                    >
                      <Upload
                        listType="text"
                        showUploadList={{ showRemoveIcon: true }}
                        accept=".pfx"
                        maxCount={1}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        <div className="btn_process">
                          <Button type="primary" size="large">
                            Cargar Certificado
                          </Button>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Firmante"
                      name={[name, "firmante"]}
                      rules={[
                        {
                          required: true,
                          message: "Porfavor ingrese el nombre del firmante",
                        },
                        {
                          pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                          message: "Solo se aceptan espacios y letras",
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Contraseña"
                      name={[name, "password"]}
                      rules={[
                        {
                          required: true,
                          message:
                            "Porfavor ingrese la contraseña del certifcado.",
                        },
                      ]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item label="Estado">
                      <Alert
                        message={
                          messageState[name] === undefined
                            ? "Sin Verificacion"
                            : messageState[name]
                        }
                        type={
                          messageState[name] === undefined
                            ? "info"
                            : messageState[name] === "Contraseña Incorrecta"
                            ? "warning"
                            : messageState[name] === "Contraseña Verificada"
                            ? "success"
                            : "error"
                        }
                        showIcon
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name),
                          setmessageState([]),
                          setstateFinish(false);
                      }}
                    />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          <Form.Item>
            <div className="btn_process">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => {
                  setmessageState([]);
                }}
              >
                Verificar Firmas
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            {stateFinish ? (
              <>
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
                  <Button
                    type="primary"
                    size="large"
                    onClick={ () => {
                      showConfirm()
                    }}
                  >
                    Firmar Documentos
                  </Button>
                </div>
              </>
            ) : undefined}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
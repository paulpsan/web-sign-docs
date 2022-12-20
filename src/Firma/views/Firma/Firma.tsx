import { Button, notification, Steps, Modal } from "antd";
import { useState } from "react";
import { TitlePage } from "../../../UI/components/TitlePage/TitlePage";
import { ListFile } from "./views/ListFiles/ListFile";
import { SignatureFile } from "./views/SignatureFile/SignatureFile";
import { UpFile } from "./views/UpFile/UpFile";
import { ExclamationCircleOutlined, FileProtectOutlined } from "@ant-design/icons";
import { CompressFile } from "./views/CompressFile/CompressFile";
import { FirmaProvider } from "../../../context/FirmaContext/FirmaContext";
import { StepsContext } from "../../../context/StepsContext/StepsContext";
import endProccessSignature from "../../../services/EndProcess/EndProcess";
import cancelProcessSignature from "../../../services/EndProcess/CancelProcess";
const { confirm } = Modal;
import "./Firma.scss";
/* Un arrat de obetos dentro del Steps. */
const steps = [
  {
    title: "Paso 1",
    content: <UpFile />,
  },
  {
    title: "Paso 2",
    content: <ListFile />,
  },
  {
    title: "Paso 3",
    content: <SignatureFile />,
  },
  {
    title: "Paso 4",
    content: <CompressFile />,
  },
];
export const Firma = () => {
/* Un HOOK que se utiliza para crear una notificación en base al contexto del componente. */
  const [api, contextHolder] = notification.useNotification();
/* Estado del current para recorrido del Steps. */
  const [current, setCurrent] = useState(0);
/* Valores iniciales entregados al contexto */
  const valueSteps = { current, setCurrent };
  /**
   * La siguiente función incrementa la variable actual en 1.
   */
  const next = () => {
    setCurrent(current + 1);
  };
/* Creación de una matriz de objetos. */
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  /**
   * IEs una función que muestra un modal con un título, un mensaje y dos botones.
   */
  const showConfirm = () => {
    confirm({
      width:"500px",
      icon: <ExclamationCircleOutlined />,
      title: '¿Desea firmar estos elementos?',
      content: '!Revise el nombre de los firmantes antes de confirmar!',
      okText: "Si",
      onOk() {
        console.log('OK');
        cancelProcessSignature();
        setCurrent(0);
      },
      cancelText: "No",
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      {contextHolder}
      <div className="title_space">
        <TitlePage
          titleContent="Firma Digital"
          iconComp={<FileProtectOutlined />}
        />
      </div>
      <Steps current={current} items={items} />
      <StepsContext.Provider value={valueSteps}>
        <FirmaProvider>
          <div className="steps-content">{steps[current].content}</div>
        </FirmaProvider>
      </StepsContext.Provider>
      <div className="steps-action">
        {current > 0 && (
          <div className="btn_danger">
            <Button
              type="primary"
              style={{ margin: "0 8px" }}
              onClick={() => showConfirm()}
              size={"large"}
              htmlType="submit"
            >
              Cancelar Proceso
            </Button>
          </div>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} size={"large"}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrent(0);
              endProccessSignature();
            }}
            size={"large"}
          >
            Terminar Proceso
          </Button>
        )}
      </div>
    </>
  );
};

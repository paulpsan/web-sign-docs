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
import endProccessSignature from "../../../api/EndProcess/EndProcess";
import cancelProcessSignature from "../../../api/EndProcess/CancelProcess";
const { confirm } = Modal;
import "./Firma.scss";
/* An array of objects. */
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
/* A hook that is used to create a notification. */
  const [api, contextHolder] = notification.useNotification();
/* A hook that is used to create a notification. */
  const [current, setCurrent] = useState(0);
/* A hook that is used to create a notification. */
  const valueSteps = { current, setCurrent };
  /**
   * The next function increments the current variable by 1.
   */
  const next = () => {
    setCurrent(current + 1);
  };
/* Creating an array of objects. */
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  /**
   * It's a function that shows a modal with a title, a message, and two buttons.
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

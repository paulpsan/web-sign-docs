import { Button, notification, Steps, Modal } from "antd";
import React, { useState } from "react";
import { TitlePage } from "../../../UI/components/TitlePage/TitlePage";
import "./Firma.scss";
import { ListFile } from "./views/ListFiles/ListFile";
import { SignatureFile } from "./views/SignatureFile/SignatureFile";
import { UpFile } from "./views/UpFile/UpFile";
import { ExclamationCircleOutlined, FileProtectOutlined } from "@ant-design/icons";
import { CompressFile } from "./views/CompressFile/CompressFile";
import { NotificationPlacement } from "antd/lib/notification";
import { FirmaProvider } from "../../../context/FirmaContext/FirmaContext";
import endProccessSignature from "../../../api/EndProcess/EndProcess";
import { Footer } from "antd/lib/layout/layout";
import { StepsContext } from "../../../context/StepsContext/StepsContext";
const { confirm } = Modal;

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
  const [api, contextHolder] = notification.useNotification();
  const [current, setCurrent] = useState(0);
  const valueSteps = { current, setCurrent };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const showConfirm = () => {
    confirm({
      width:"500px",
      icon: <ExclamationCircleOutlined />,
      title: '¿Desea firmar estos elementos?',
      content: '!Revise el nombre de los firmantes antes de confirmar!',
      okText: "Si",
      onOk() {
        console.log('OK');
        setCurrent(0);
        endProccessSignature();
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
              setCurrent(0), endProccessSignature();
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

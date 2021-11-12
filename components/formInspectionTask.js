import React, { useEffect } from "react";
import HeaderCreateTaskInspection from "./headerCreateTaskInspection";
import Select from "react-select";
import HeaderCreateInspection from "./headerCreateInspection";
import useState from "react-usestateref";
import { getDesings } from "./functions/datafunctions";
import FormCreateInspection from "./formCreateInspection";
import FormCreateTask from "./formCreateTask";
const formInspectionTask = (props) => {
  const [inspectionCreated, setInspectionCreated, inspectionCreatedRef] =
    useState(false);
  const [colorPageInspection, setColorPageInspection, colorPageInspectionRef] =
    useState(" bg-blue-logo");
  const [colorPageTask, setColorPageTask, colorPageTaskRef] =
    useState(" bg-white");
  const [textPageInspection, setTextPageInspection, textPageInspectionRef] =
    useState("white");
  const [textPageTask, setTextPageTask, textPageTaskRef] = useState("black");
  const [dataInspection, setDataInspection, dataInspectionRef] = useState();
  const [idInspection, setIdInspection, idInspectionRef] = useState(0);
  const inspectionCorrectConfirm = (dataInspection, idInspection) => {
    setDataInspection(dataInspection);
    setIdInspection(idInspection);
    if (inspectionCreatedRef.current) {
      setInspectionCreated(false);
      setColorPageTask(" bg-white");
      setTextPageInspection("white");
      setTextPageTask("black");
      setColorPageInspection(" bg-blue-logo");
    } else {
      setInspectionCreated(true);
      setColorPageTask(" bg-blue-logo");
      setTextPageInspection("black");
      setTextPageTask("white");
      setColorPageInspection(" bg-white");
    }
  };
  const cerrar = () => {
    props.cerrar();
  }
  return (
    <>
      <div class="w-full py-6">
        <div class="flex justify-center">
          {!inspectionCreatedRef.current &&
          <div className="flex items-center pr-4">
            <svg
              onClick={() => {
                props.cerrar();
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-arrow-left cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          }
          <HeaderCreateInspection
            color={colorPageInspectionRef.current}
            textColor={textPageInspectionRef.current}
          />
          <HeaderCreateTaskInspection
            color={colorPageTaskRef.current}
            textColor={textPageTaskRef.current}
          />
        </div>
      </div>
      <hr />
      {!inspectionCreatedRef.current ? (
        <FormCreateInspection clickFunction={inspectionCorrectConfirm} />
      ) : (
        <FormCreateTask
          dataInspection={dataInspectionRef.current}
          idInspection={idInspectionRef.current}
          cerrar={cerrar}
        />
      )}
    </>
  );
};

export default formInspectionTask;

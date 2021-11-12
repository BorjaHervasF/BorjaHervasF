import React, { useEffect } from "react";
import CardRework from "../../../components/cardRework.js";
import {
  getInspections,
  getChildNodes,
  getStrucureHeadersTable,
  getResultsByFlexDisplay,
  getResultsByOneNode,
} from "../../functions/datafunctions";
import CardReworkSkeleton from "../../../components/cardReworkSkeleton.js";
import useState from "react-usestateref";
import Table from "../../Table";
import FormTaskInspection from "../../formInspectionTask.js";
import Blackback from "../../../components/utilities/blackback";
import Modal from "../../../components/utilities/modal";
const Reworks = (props) => {
  const [data, setData, dataRef] = useState([]);
  const [orderColums, setOrderColumns, orderColumnsRef] = useState([]);
  const [ruta, setRuta, rutaRef] = useState([]);
  const [columns, setColumns, columnsRef] = useState([]);
  const [dataVehicle, setDataVehicle, dataVehicleRef] = useState([]);
  const [Tab, setTab, TabRef] = useState("active");
  const [correctOrder, setCorrectOrder, correctOrderRef] = useState([]);
  const [cerrar, setCerrar, cerrarRef] = useState(true);
  const [flexDisplay, setFlexDisplay, FlexDisplayRef] = useState(false);
  const [createInspection, setCreateInspection, createInspectionRef] =
    useState(false);
  const [isTask, setIsTask, isTaskRef] = useState(false);
  const [
    idSelectedOrederColumns,
    setIdSelectedOrederColumns,
    idSelectedOrederColumnsRef,
  ] = useState();
  useEffect(() => {
    getInspections().then((res) => {
      setData(res.data);
      setRuta([...ruta, res.data]);
      setCorrectOrder(res.data);
    });
  }, []);
  const cerrarModal = () => {
    setCerrar(true);
  };
  const cerrarInpseccion = () => {
    setCreateInspection(false);
    getInspections().then((res) => {
      setData(res.data);
    });
    resetRuter();
  };
  const orderInspections = () => {
    if (correctOrderRef.current.length <= 0) {
      const prevNull = dataRef.current.find(
        (element) => element.order.prev.length <= 0
      );
      correctOrderRef.current.push(prevNull);
    }
    for (let i = 0; i < dataRef.current.length; i++) {
      if (correctOrderRef.current[i].order.next.length > 0) {
        const next = dataRef.current.find(
          (element) =>
            element.id == correctOrderRef.current[i].order.next[0].condifId
        );
        correctOrderRef.current.push(next);
      }
    }
    setData(correctOrderRef.current);
  };

  const selectIdOrderColumn = (id) => {
    console.log("id",id);
    console.log("idactual",idSelectedOrederColumnsRef.current);
    if (idSelectedOrederColumnsRef.current) {
      document
        .getElementById(idSelectedOrederColumnsRef.current)
        .classList.remove("bg-gray-400");
    }
    setIdSelectedOrederColumns(id);
    document.getElementById(id).classList.add("bg-gray-400");
  };
  const upPosition = (order) => {
    let previous = order[idSelectedOrederColumnsRef.current - 1];
    let seleced = order[idSelectedOrederColumnsRef.current];
    order[idSelectedOrederColumnsRef.current - 1] = seleced;
    order[idSelectedOrederColumnsRef.current] = previous;
    console.log(idSelectedOrederColumnsRef.current - 1);
    setIdSelectedOrederColumns(idSelectedOrederColumnsRef.current);
    selectIdOrderColumn(idSelectedOrederColumnsRef.current-1)
  };
  const downPosition = (order) => {
    let previous = order[idSelectedOrederColumnsRef.current + 1];
    let seleced = order[idSelectedOrederColumnsRef.current];
    order[idSelectedOrederColumnsRef.current + 1] = seleced;
    order[idSelectedOrederColumnsRef.current] = previous;
    console.log(idSelectedOrederColumnsRef.current + 1);
    setIdSelectedOrederColumns(idSelectedOrederColumnsRef.current);
    selectIdOrderColumn(idSelectedOrederColumnsRef.current+1)
  };
  const generateCardsOrder = (order) => {
    console.log("me llega subida", order);
    return order.map((inspection, i) => {
      return [
        <div
          className="border-2 border-opacity-100 text-xl mb-4 h-16 w-11/12 cursor-pointer hover:bg-gray-400 hover:text-white flex items-center justify-center"
          id={i}
          onClick={() => selectIdOrderColumn(i)}
        >
          {inspection.name}
        </div>,
      ];
    });
  };
  const resetRuter = () => {
    if (rutaRef.current.length > 0) {
      setData(rutaRef.current[0]);
      setColumns([]);
      setRuta([rutaRef.current[0]]);
      setFlexDisplay(false);
      setIsTask(false);
    }
  };
  const childNode = (inspection) => {
    setRuta([...ruta, inspection]);
    setData([]);
    setIsTask(true);
    let rows = [
      { Header: "", id: "action", accessor: "actions", width: 120 },
      { Header: "VIN", id: "vin", accessor: "vin" },
      { Header: "MODEL", id: "model", accessor: "model" },
    ];
    let finalRows = [
      { Header: "USER", id: "user", accessor: "user", width: 120 },
      { Header: "DT START", id: "createdAt", accessor: "createdAt" },
      { Header: "DT END", id: "updatedAt", accessor: "updatedAt" },
    ];
    if (inspection.flexDisplay == 0 && inspection.childNodes.length > 0) {
      setFlexDisplay(false);
      getChildNodes(inspection.id).then((res) => {
        setData(res.data);
        setOrderColumns(res.data);
        setCorrectOrder([]);
        orderInspections();
      });
    } else if (
      inspection.flexDisplay == 1 &&
      inspection.childNodes.length > 0
    ) {
      setFlexDisplay(true);
      getStrucureHeadersTable(inspection.id).then((res) => {
        setColumns([...rows, ...res.data]);
        setColumns([...columnsRef.current, ...finalRows]);
      });
      getResultsByFlexDisplay(inspection.id).then((res) => {
        let vehicleData = res.data;
        let dataVehicle = Object.entries(vehicleData).map((vehicle, i) => {
          let object = {};
          object.id = vehicle[1].vehicle.id;
          object.vin = vehicle[1].vehicle.vin;
          object.model = vehicle[1].vehicle.model;
          vehicle[1].results.forEach((result) => {
            object[result.node.id] = result.value;
            object.user = result.user;
            object.createdAt = result.createdAt;
            object.updatedAt = result.updatedAt;
            object["register" + result.idRegister] = {
              idRegister: result.idRegister,
              name: result.node.name,
              idNode: result.node.id,
            };
          });
          return object;
        });
        setDataVehicle(dataVehicle);
      });
    } else {
      setFlexDisplay(true);
      getResultsByOneNode(inspection.id, rutaRef.current[1].id).then((res) => {
        if (res.data[0]) {
          let childNode = [
            {
              Header: res.data[0].node.name,
              id: res.data[0].node.id.toString(),
              accessor: res.data[0].node.id.toString(),
              width: 120,
            },
          ];
          setColumns([...rows, ...childNode]);
          setColumns([...columnsRef.current, ...finalRows]);
          let object = {};
          let dataRes = res.data;
          let dataVehicle = dataRes.map((vehicle, i) => {
            object.id = dataRes[i].vehicle.id;
            object.vin = dataRes[i].vehicle.vin;
            object.model = dataRes[i].vehicle.model;
            object[dataRes[i].node.id] = dataRes[i].value;
            object.user = dataRes[i].user;
            object.createdAt = dataRes[i].createdAt;
            object.updatedAt = dataRes[i].updatedAt;
            object["register" + dataRes[i].id] = {
              idRegister: dataRes[i].id,
              name: dataRes[i].node.name,
              idNode: dataRes[i].node.id,
            };
            return object;
          });
          setDataVehicle(dataVehicle);
        } else {
          console.log("No tiene datos");
        }
      });
    }
  };
  return (
    <>
      {!cerrarRef.current && (
        <Blackback>
          <Modal header={"Order task"} closeModal={cerrarModal}>
            <div className="w-full text-center h-468px overflow-x-auto grid grid-cols-5">
              <div className=" flex items-center justify-center">
                <div className="grid-cols-2">
                  <div className="pb-8">
                    <div className="border-2 border-black border-opacity-100 rounded-full flex items-center p-1 hover:bg-gray-400 hover:text-white">
                      <button
                        onClick={() => upPosition(orderColumnsRef.current)}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          class="bi bi-arrow-up"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-black border-opacity-100 rounded-full flex items-center p-1 hover:bg-gray-400 hover:text-white">
                    <button onClick={() => downPosition(orderColumnsRef.current)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" col-span-4 h-full overflow-x-auto flex items-center">
                <div className="w-full mt-4">
                  {generateCardsOrder(orderColumnsRef.current)}
                </div>
              </div>
            </div>
          </Modal>
        </Blackback>
      )}
      {!createInspectionRef.current ? (
        <>
          <div className="grid grid-cols-2 gap-4 pt-6 px-6">
            <div className="table-cell">
              <>
                <span
                  className="cursor-pointer align-middle"
                  onClick={() => resetRuter()}
                >
                  INICIO
                </span>

                {rutaRef.current.map((ruta, i) => {
                  return (
                    <>
                      <span className="cursor-pointer align-middle">
                        {ruta.name}
                      </span>
                      {rutaRef.current.length > 1 &&
                        i < rutaRef.current.length - 1 && (
                          <span className="align-middle"> &#62; </span>
                        )}
                    </>
                  );
                })}
              </>
            </div>
            <div className="flex justify-end">
              {isTaskRef.current && (
                <div className="pr-4 flex">
                  <button onClick={() => setCerrar(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      class="bi bi-arrow-down-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex">
                <button onClick={() => setCreateInspection(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="black"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {rutaRef.current.length == 1 && (
            <div className="w-full justify-center flex mt-10">
              <div className="bg-gray-200 text-md text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex z-50">
                <button
                  onClick={() => setTab("active")}
                  className={
                    "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-l-full px-4 py-2 " +
                    (Tab === "active"
                      ? "bg-white border-full text-gray-700"
                      : "")
                  }
                  id="active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    class="bi bi-gear-wide-connected"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
                  </svg>{" "}
                  <span className="ml-1 pb-1">ACTIVE</span>
                </button>
                <button
                  onClick={() => setTab("completed")}
                  className={
                    "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-r-full px-4 py-2 " +
                    (Tab === "completed"
                      ? "bg-white border-full text-gray-700"
                      : "")
                  }
                  id="completed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    class="bi bi-check2-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>{" "}
                  <span className="ml-1 pb-1">COMPLETED</span>
                </button>
              </div>
            </div>
          )}
          <br />
          {TabRef.current == "active" ? (
            <>
              {!FlexDisplayRef.current ? (
                <div className=" px-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 ">
                  {dataRef.current.length <= 0 ? (
                    <>
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                      <CardReworkSkeleton />
                    </>
                  ) : (
                    <>
                      {dataRef.current.map((inspection, i) => {
                        console.log(inspection);
                        return (
                          <CardRework
                            data={inspection}
                            clickFunction={childNode}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              ) : (
                <div className="py-4 px-4">
                  <Table
                    data={dataVehicleRef.current}
                    columns={columnsRef.current}
                    pagDefault={16}
                    download={true}
                    download_title={"layout"}
                  />
                </div>
              )}
            </>
          ) : (
            <span></span>
          )}
        </>
      ) : (
        <FormTaskInspection cerrar={cerrarInpseccion} />
      )}
    </>
  );
};
export default Reworks;

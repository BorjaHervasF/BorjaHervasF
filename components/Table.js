import React, { useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Calendar from "./Table/Calendar";
import Download from "./Table/Download";
import useState from "react-usestateref";
import Users from "./Table/Users";
import ReactTooltip from "react-tooltip";
import Reordercolumns from "./utilities/reordercolumns";
import { calcular_columnas } from "./Table/CalculateColumns";
import Createuser from "./Table/Createuser";
import Createdevice from "./Table/Createdevice";
import CreateRule from "./Table/CreateRule";
import CreateHold from "./Table/CreateHold";
import AddVinsToHold from "./Table/addVinsToHold";
import Releasehold from "./Table/releaseHolds";
import SendMessageUsers from "./Table/SendMessageUsers";
import CopyVins from "./Table/copyvins";
import CreateDB from "./Table/create_db";
import CreateLoad from "./Table/CreateLoad";

const Table = (props) => {
  var [dataXcel, setdataXcel, dataXcelRef] = useState([]);

  var [Columna, setColumna, ColumnaRef] = useState([]);
  var [Datos, setDatos, DatosRef] = useState([]);

  var [DataArrive, setDataArrive, DataArriveRef] = useState(false);

  var [OrderCol, setOrderCol, OrderColRef] = useState(false);

  var [checked, setChecked, checkedRef] = useState([]);
  var [vinsSeleccionados, setvinsSeleccionados, vinsSeleccionadosRef] =
    useState([]);
  var [selectAll, setSelectAll, selectAllRef] = useState(false);
  const [chckboxes, setChckboxes, chckboxesRef] = useState([]);
  var [load, setLoad, loadRef] = useState(false);
  const [lastChecked, setLastChecked, lastCheckedRef] = useState(null);
  const handleChange = () => {
    let vinsSeleccionados_ = [];
    if (selectAllRef.current) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }

    var checkedCopy = [];

    DatosRef.current.forEach(function (e, index) {
      checkedCopy.push(selectAllRef.current);
    });

    setChecked(checkedCopy);

    if (checkedCopy[0] === true) {
      dataXcelRef.current.forEach((element) => {
        vinsSeleccionados_.push(element.vin);
      });
    } else {
      vinsSeleccionados_ = [];
    }
    setvinsSeleccionados(vinsSeleccionados_);
  };

  const handleSingleCheckboxChange = (index) => {
    var checkedCopy = checkedRef.current;
    checkedCopy[index.index] = !checkedRef.current[index.index];

    if (vinsSeleccionadosRef.current.includes(index.original.vin)) {
      let posicionVin = vinsSeleccionadosRef.current.indexOf(
        index.original.vin
      );
      vinsSeleccionadosRef.current.splice(posicionVin, 1);
    } else {
      vinsSeleccionadosRef.current.push(index.original.vin);
    }

    setvinsSeleccionados((vinsSeleccionados) => [
      ...vinsSeleccionadosRef.current,
    ]);
    setChecked((checked) => [...checkedCopy]);
  };

  useEffect(() => {
    if (props.columns) {
      if (props.columns !== undefined) {
        if (props.columns.length > 0) {
          if ("accessor" in props.columns[0]) {
            if (props.copy) {
              let objetoChecks = {
                Header: (state) => (
                  <input
                    type="checkbox"
                    className="checkbox-tabla-seleccion"
                    onChange={() => handleChange()}
                    checked={selectAllRef.current}
                  />
                ),
                Cell: (row) => (
                  <div className="w-full justify-center flex items-center h-full">
                    <input
                      type="checkbox"
                      id={"id_chk_" + [row.index]}
                      className="checkbox-tabla-seleccion checkBoxRange chkbox"
                      defaultChecked={checkedRef.current[row.index]}
                      checked={checkedRef.current[row.index]}
                      onChange={() => handleSingleCheckboxChange(row)}
                    />
                  </div>
                ),
                noimprimir: true,
                sortable: false,
                width: 40,
                filterable: false,
                resizable: false,
              };
              props.columns.splice(1, 0, objetoChecks);
            }
            setColumna(calcular_columnas(props.columns));
            setLoad(true);
          }
        }
      }
    }
  }, [props.columns]);

  useEffect(() => {
    // setChckboxes([].slice.call(document.getElementsByClassName("chkbox")));

    // for (var i = 0; i < chckboxesRef.current.length; i++) {
    //   chckboxesRef.current[i].addEventListener("click", (e) => {
    //     if (!lastCheckedRef.current) {
    //       var idStart = e.target.id.split("_");
    //       setLastChecked(idStart[2]);
    //       return lastCheckedRef.current;
    //     }
    //     if (e.shiftKey) {
    //       console.log("hola");
    //       var id = e.target.id.split("_");
    //       var start = lastCheckedRef.current;
    //       var end = id[2];
    //       console.log(start);
    //       console.log(end);
    //       // if (end > start) {
    //       //     var oldStart = start
    //       //     start = end
    //       //     end = oldStart
    //       // }
    //       console.log(checkedRef.current);
    //         if (start > 0) {
    //             for (let f = start-1; f <= end; f++) {
    //                 console.log("f",f);
    //                 checkedRef.current.push(true);
    //                 // document.getElementsByClassName("chkbox")[f - -1].setAttribute('checked','checked');
    //               } 
    //         }

    //     }
    //     var idStart = e.target.id.split("_");
    //     setLastChecked(idStart[2]);
    //   });
    // }

    if (props.data) {
      setDatos(props.data);
      setDataArrive(true);

      if (props.load === true) {
        setLoad(true);
      }
    }
  }, [props.data]);

  const aplicarCalendario = (data) => {
    setDatos(data);
  };

  const recargarTable = () => {
    props.montarTabla();
  };

  return (
    <>
      {DatosRef.current.length === 0 && loadRef.current === false && (
        <>
          <div className="w-full relative">
            <div className="w-full flex justify-center mt-4">
              {[...Array(9)].map((e) => {
                return (
                  <div className="w-1/6 h-10 bg-gray-300 animate-pulse mr-2"></div>
                );
              })}
            </div>
            {[...Array(props.pagDefault ? props.pagDefault : 15)].map((e) => {
              return (
                <div className="w-full h-12 bg-gray-300 animate-pulse mt-2"></div>
              );
            })}
          </div>
        </>
      )}
      {((DatosRef.current.length > 0 && DataArriveRef.current === true) ||
        loadRef.current === true) && (
        <>
          <Reordercolumns
            recargarTable={recargarTable}
            closeModal={setOrderCol}
            config={props.configColumns}
            show={OrderColRef.current}
            functionShow={setOrderCol}
          />
          <ReactTable
            data={DatosRef.current}
            columns={ColumnaRef.current}
            loading={false}
            filterable
            resizable={true}
            className="-striped -highlight"
            defaultPageSize={props.pagDefault ? props.pagDefault : 19}
            showPaginationTop={false}
            showPaginationBottom={true}
            defaultFilterMethod={(filter, row) => {
              if (filter.value.toLowerCase()[0] == "!") {
                if (filter.value.toLowerCase()[1] == "*") {
                  return (
                    !String(row[filter.id]).toLowerCase() ==
                    filter.value.toLowerCase().split("!**")[1]
                  );
                } else {
                  return !String(row[filter.id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase().split("!")[1]);
                }
              } else {
                if (
                  filter.value.toLowerCase()[0] == "*" &&
                  filter.value.toLowerCase()[1] == "*"
                ) {
                  return (
                    String(row[filter.id]).toLowerCase() ==
                    filter.value.toLowerCase().split("**")[0]
                  );
                } else {
                  if (filter.value.toLowerCase()[0] == "=") {
                    return (
                      String(row[filter.id]).toLowerCase() ==
                      filter.value.toLowerCase().split("=")[1]
                    );
                  } else {
                    if (filter.value[0] === "+") {
                      if (filter.value.length > 1) {
                        let cond = "";
                        filter.value
                          .toUpperCase()
                          .substring(1, filter.value.length)
                          .split(",")
                          .map((x, i) => {
                            if (i !== filter.value.split(",").length - 1) {
                              if (x[0] === "!") {
                                cond += `!'${row[filter.id]}'.includes('${
                                  x.split("!")[1]
                                }') &&`;
                              } else {
                                cond += `'${
                                  row[filter.id]
                                }'.includes('${x}') ||`;
                              }
                            } else {
                              if (x[0] === "!") {
                                cond += `!'${row[filter.id]}'.includes('${
                                  x.split("!")[1]
                                }')`;
                              } else {
                                cond += `'${row[filter.id]}'.includes('${x}')`;
                              }
                            }
                          });
                        return eval(cond);
                      }
                    } else {
                      return String(row[filter.id])
                        .toLowerCase()
                        .includes(filter.value.toLowerCase().trim());
                    }
                  }
                }
              }
            }}
          >
            {(state, makeTable, instance) => {
              let recordsInfoText = "";

              const { filtered, pageRows, pageSize, sortedData, page } = state;
              if (sortedData && sortedData.length > 0) {
                let isFiltered = filtered.length > 0;
                setdataXcel(sortedData);

                let totalRecords = Number(sortedData.length)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

                let recordsCountFrom = page * pageSize + 1;

                let recordsCountTo = recordsCountFrom + pageRows.length - 1;

                if (isFiltered) {
                  recordsInfoText = `${totalRecords} Results`;
                } else {
                  recordsInfoText = `${totalRecords} Results`;
                }
              } else {
                recordsInfoText = "0 Results";
              }

              return (
                <>
                  <div className="main-grid top-1">
                    <div className="flex justify-between mb-2">
                      <div className="w-2/12 ml-4">
                        <span className="font-bold">{recordsInfoText}</span>{" "}
                      </div>
                      <div className="w-10/12 justify-end flex space-x-3 mr-2">
                        {props.create_db && (
                          <CreateDB
                            data={props.data}
                            actualizar={props.actualizar}
                          />
                        )}
                        {props.copy && (
                          <CopyVins vins={vinsSeleccionadosRef.current} />
                        )}
                        {props.createLoad && (
                          <CreateLoad vins={vinsSeleccionadosRef.current} />
                        )}
                        {props.sendMessageUsers && <SendMessageUsers />}
                        {props.releasehold && (
                          <Releasehold actualizar={props.actualizar} />
                        )}
                        {props.addvinstohold && (
                          <AddVinsToHold
                            montarTablaHolds={
                              props.montarTablaHolds
                                ? props.montarTablaHolds
                                : ""
                            }
                          />
                        )}
                        {props.createRule && <CreateRule />}
                        {props.createHold && <CreateHold />}
                        {props.users && <Users />}
                        {props.calendar && (
                          <Calendar
                            data={props.data}
                            columna={props.calendar_column}
                            nuevosDatos={aplicarCalendario}
                          />
                        )}
                        {props.download && (
                          <Download
                            data={dataXcelRef.current}
                            columns={props.columns}
                            title={props.download_title}
                          />
                        )}
                        {props.createUser && (
                          <Createuser
                            montarTablaUsers={props.montarTablaUsers}
                          />
                        )}
                        {props.createDevice && <Createdevice />}
                        {props.orderColumns && (
                          <>
                            <div
                              onClick={() => setOrderCol(true)}
                              data-tip
                              data-for="order_columns"
                              className="cursor-pointer"
                            >
                              <svg
                                class="w-6 h-6 text-gray-800 hover:text-black cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                ></path>
                              </svg>
                              <ReactTooltip
                                backgroundColor="#000"
                                id="order_columns"
                                effect="solid"
                                place="bottom"
                                aria-haspopup="true"
                                role="example"
                              >
                                Order Columns
                              </ReactTooltip>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {makeTable()}
                  </div>
                </>
              );
            }}
          </ReactTable>
        </>
      )}
    </>
  );
};

export default Table;

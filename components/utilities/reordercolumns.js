import React, { useEffect, useRef } from "react";
import Blackback from "./blackback";
import Modal from "./modal";
import useState from "react-usestateref";
import { saveProfile } from "../functions/datafunctions";
import Loader from "../../components/Loader";
const reordercolumns = (props) => {
  const childRef = useRef();
  var [config, setconfig, configRef] = useState([]);
  var [ConfigEdit, setConfigEdit, configEditRef] = useState([]);
  var [edited, setEdited, editedRef] = useState(false);
  var [cerrar, setcerrar, cerrarRef] = useState(true);
  const cerrarModal = () => {
    props.functionShow(false);
    setConfigEdit(
      JSON.parse(localStorage.getItem("profile")).config[props.config]
    );
    setcerrar(true);
  };
  useEffect(() => {
    if (props.config) {
      setConfigEdit(
        JSON.parse(localStorage.getItem("profile")).config[props.config]
      );
      console.log("Esta es la config del principio", configEditRef.current);
    }
  }, [props.config]);

  //   const calculateColumns = (array) => {
  //     let newArray = [];
  //     let oldArray = array;
  //     let comienza = 1;

  //     eliminar(oldArray);
  //     function eliminar(oldArray) {
  //       oldArray.forEach((columna, i) => {
  //         if (columna.ordered === comienza) {
  //           newArray.push(columna);
  //           oldArray.splice(i, 1);
  //           comienza++;
  //           eliminar(oldArray);
  //         }
  //       });
  //     }

  //     return newArray;
  //   };
  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const recalculate_order = (array) => {
    let comienza = 1;
    let array_new = array;
    array_new.forEach((columna) => {
      columna.ordered = comienza;
      comienza++;
    });

    let json_enviar = {
      tableId: array_new[0].table_id,
      columns: [],
    };

    array_new.forEach((elem) => {
      json_enviar.columns.push({
        active: elem.active,
        column_id: elem.column_id,
        table_id: elem.table_id,
      });
    });

    setConfigEdit(array_new);
    setconfig(json_enviar);
  };

  const toggleActive = (columna, id) => {
    let array = configEditRef.current;

    array.forEach((col) => {
      if (col.Header === columna.Header) {
        if (col.active == 1) {
          col.active = 0;
        } else {
          col.active = 1;
        }
      }
    });

    // let profile = JSON.parse(localStorage.getItem('profile'))
    // profile.config[props.config] = array
    // localStorage.setItem('profile', JSON.stringify(profile))

    setConfigEdit(array);
    setConfigEdit(configEditRef.current);

    let json_enviar = {
      tableId: array[0].table_id,
      columns: [],
    };

    array.forEach((elem) => {
      json_enviar.columns.push({
        active: elem.active,
        column_id: elem.column_id,
        table_id: elem.table_id,
      });
    });
    setconfig(json_enviar);
  };

  const save = () => {
    document.getElementById("spin").classList.remove("hidden")
    let profile = JSON.parse(localStorage.getItem("profile"));
    profile.config[props.config] = configEditRef.current;
    localStorage.setItem("profile", JSON.stringify(profile));
    saveProfile(configRef.current).then((res) => {
      if (props.recargarTable) {
        props.recargarTable();
        document.getElementById("spin").classList.add("hidden")
      }
    });
  };

  return (
    <div className={props.show ? "" : "hidden"}>
      <Blackback>
        <Modal closeModal={cerrarModal} header="Order columns">
          <div className="h-1/2 overflow-auto">
            {configEditRef.current.length > 0 &&
              configEditRef.current.map((columna, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "w-full p-2 border-2 flex mt-2 mb-2" +
                      (!columna.active ? " bg-gray-200" : "")
                    }
                  >
                    <div className="w-2/12">
                      {columna.configurable == 1 && (
                        <>
                          {columna.active == 1 && (
                            <svg
                              onClick={() => {
                                toggleActive(columna, columna.id);
                              }}
                              className="w-6 h-6 transform translate-y-1 cursor-pointer"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                          {columna.active == 0 && (
                            <svg
                              onClick={() => {
                                toggleActive(columna, columna.id);
                              }}
                              className="w-6 h-6 text-gray-500 transform translate-y-1 cursor-pointer"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          )}
                        </>
                      )}
                    </div>
                    <div className="ml-2 w-8/12 text-xl text-center">
                      {columna.Header}
                    </div>
                    <div className="w-2/12 flex space-x-1 ">
                      {columna.configurable == 1 && (
                        <>
                          {i > 0 &&
                            configEditRef.current[i - 1].configurable == 1 && (
                              <div
                                onClick={() => {
                                  recalculate_order(
                                    array_move(configEditRef.current, i, i - 1)
                                  );
                                }}
                                className="cursor-pointer w-8 h-8 justify-center flex items-center border-2 bg-white hover:bg-gray-100 rounded-sm"
                              >
                                <svg
                                  class="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  ></path>
                                </svg>
                              </div>
                            )}
                          {!(i === configEditRef.current.length - 1) && (
                            <div
                              onClick={() => {
                                recalculate_order(
                                  array_move(configEditRef.current, i, i + 1)
                                );
                              }}
                              className="cursor-pointer w-8 h-8 justify-center flex items-center border-2 bg-white hover:bg-gray-100 rounded-sm"
                            >
                              <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                ></path>
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="hidden" id="spin">
          <div className="w-full flex justify-center pt-3">
            <Loader ref={childRef} type="3" />
          </div>
          </div>
          <div className="flex justify-center pt-4">
            <div className="pr-4">
              <button
                onClick={() => save()}
                className=" border-2 border-green-500 text-lg text-green-500 rounded hover:bg-green-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5"
              >
                SAVE
              </button>
            </div>
            <div className="pr-4">
              <button
                onClick={() => cerrarModal()}
                className=" border-2 border-red-500 text-lg text-red-500 rounded hover:bg-red-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5"
              >
                CANCEL
              </button>
            </div>
          </div>
        </Modal>
      </Blackback>
    </div>
  );
};

export default reordercolumns;

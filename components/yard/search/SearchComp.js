import React, { useEffect, useRef } from "react";
import Table from "../../Table";
import useState from "react-usestateref";
import Select from "react-select";
import SelecDate from "../../SelectDate";
import { Search } from "../../functions/datafunctions";
import { elim_duplicates } from "../../utilities/elim_duplicates";
import $ from "jquery";
import { vintoshort } from "../../utilities/VintoShort";
import Loader from "../../../components/Loader";
const SearchComp = () => {
  var [data, setData, dataRef] = useState([]);
  var [columns, setColumns, columnsRef] = useState([]);
  var [Tab, setTab, TabRef] = useState("vin");

  var [select, setSelect, selectRef] = useState("");
  var [selectOrigin, setSelectOrigin, selectOriginRef] = useState("");
  var [selectDestination, setSelectDestination, selectDestinationRef] =
    useState("");

  var [optionsSelection, setOptionsSelection, optionsSelectionRef] = useState(
    []
  );
  const childRef = useRef();
  var [error, setError, errorRef] = useState(false);

  var [Date_, setDate_, Date_Ref] = useState([]);

  var [isTabla, setIsTabla, isTablaRef] = useState(false);

  var [Toggle, setToggle, ToggleRef] = useState(true);

  var [Objeto, setObjeto, ObjetoRef] = useState("");

  var [messageError, setMessageError, messageErrorRef] = useState("");

  useEffect(() => {
    $("textarea").attr(
      "placeholder",
      "01234XXXXXXXXXXX \n43210YYYYYYYYYYYY \n..."
    );
  });

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let first_date = [year, month, day].join("-");
    let second_date = [hours, minutes, seconds].join(":");

    return first_date + " " + second_date;
  };

  const buscar = async (tipo) => {
    let localCompound = true;

    if (ToggleRef.current) {
      localCompound = true;
    } else {
      localCompound = null;
    }

    console.log(Date_Ref.current);

    if (tipo === "vin") {
      //FILTRAR POR VIN

      let json = {};

      if (Date_Ref.current.length > 0) {
        // FILTRAR POR FECHA

        json = {
          mode: "stateDt",
          stateId: selectRef.current ? selectRef.current.value : "1",
          dtStart: formatDate(Date_Ref.current[0]._d),
          dtEnd: formatDate(Date_Ref.current[1]._d),
        };
      } else {
        // FILTRAR POR VINS

        let vinses = await vintoshort(
          elim_duplicates($("#vins").val().split("\n"))
        );

        if (selectRef.current) {
          json = {
            mode: "stateDt",
            stateId: selectRef.current ? selectRef.current.value : "1",
            dtStart: null,
            dtEnd: null,
          };
        } else {
          json = {
            mode: "vins",
            vins: vinses,
          };
        }
      }

      montarTabla(json);
    } else {
      //FILTRAR POR MOVIMIENTOS

      let json = {};

      if (Date_Ref.current.length > 0 && $("#vins").val().trim() === "") {
        // FILTRAR POR FECHA

        json = {
          mode: "movements",
          conditions: null,
          dtStart: formatDate(Date_Ref.current[0]._d),
          dtEnd: formatDate(Date_Ref.current[1]._d),
        };
      } else {
        // FILTRAR POR VINS

        json = {
          mode: "movements",
          conditions: [
            {
              column: "vin",
              value: elim_duplicates($("#vins").val().split("\n")),
            },
          ],
          dtStart: null,
          dtEnd: null,
        };
      }
      montarTabla(json);
    }
  };

  const montarTabla = (objeto) => {
    setMessageError("");
    console.log(document.getElementById("spin"));
    if (document.getElementById("spin")) {
      console.log("Le quito invisible");
      console.log("elemento", document.getElementById("spin"));
      document.getElementById("spin").classList.remove("hidden");
    }
    if (objeto.vins != "") {
      if (objeto == undefined) {
        objeto = ObjetoRef.current;
      } else {
        setObjeto(objeto);
      }
      let columna = JSON.parse(localStorage.getItem("profile"))["config"][
        "search"
      ];
      Search(objeto).then((res) => {
        if (res.error === false) {
          if (res.data.length === 0) {
            setError(true);
            document.getElementById("spin").classList.add("hidden");
            setMessageError("Please, check the vins");
          } else {
            document.getElementById("spin").classList.add("hidden");
            setError(false);
            if ("rule" in res.data[0]) {
              let jsonColumnas = [
                { Header: "VIN", accessor: "vin" },
                { Header: "ORIGIN", accessor: "origin" },
                { Header: "DESTINATION", accessor: "destination" },
                { Header: "RULE", accessor: "rule" },
                { Header: "USER", accessor: "user" },
                { Header: "DT START", accessor: "dt_start" },
                { Header: "DT END", accessor: "dt_end" },
              ];

              columna = jsonColumnas;
            }
            console.log(res);
            setData(res.data);
            setColumns(columna);
            setIsTabla(true);
          }
        } else {
          console.log(res);
          setMessageError(res.message);
          document.getElementById("spin").classList.add("hidden");
          console.log(messageErrorRef.current);
        }
      });
    } else {
      setMessageError("Please, enter vins");
      document.getElementById("spin").classList.add("hidden");
    }
  };

  return (
    <div class="grid grid-cols-8 gap-4">
      <div
        className={
          "flex justify-center " + (isTabla ? "col-span-2" : "col-span-8")
        }
      >
        <div className={"rounded-lg " + (isTabla ? "w-full" : "w-1/2")}>
          <div className="w-full justify-center flex mt-10">
            <div className="bg-gray-200 text-md text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
              <button
                onClick={() => setTab("vin")}
                className={
                  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-l-full px-4 py-2 " +
                  (Tab === "vin" ? "bg-white border-full text-gray-700" : "")
                }
                id="vin"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                <span className="ml-1">VINS</span>
              </button>
              <button
                onClick={() => setTab("mov")}
                className={
                  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 px-4 py-2 " +
                  (Tab === "mov" ? "bg-white border-full text-gray-700" : "")
                }
                id="mov"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
                <span className="ml-1">MOV.</span>
              </button>
              <button
                onClick={() => setTab("eoc")}
                className={
                  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 px-4 py-2 " +
                  (Tab === "eoc" ? "bg-white border-full text-gray-700" : "")
                }
                id="eoc"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
                <span className="ml-1">EOC</span>
              </button>
              <button
                onClick={() => setTab("users")}
                className={
                  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-r-full px-4 py-2 " +
                  (Tab === "users" ? "bg-white border-full text-gray-700" : "")
                }
                id="users"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  class="bi bi-person-lines-fill w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
                <span className="ml-1">USERS</span>
              </button>
            </div>
          </div>

          {TabRef.current === "vin" && (
            <div className="mb-4 mt-2 justify-center flex">
              <div className="w-2/3 p-4 mt-5 rounded">
                <div className="w-full justify-end flex">
                  <div className="mr-2">
                    <SelecDate setDate={setDate_} />
                  </div>

                  <div
                    className="ml-2"
                    onClick={() => {
                      setSelect("");
                      document.getElementById("vins").value = ""; 
                      setDate_([]);
                      setMessageError("");
                    }}
                  >
                    <svg
                      class="w-6 h-6 text-red-500 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <Select
                  options={[
                    { value: "1", label: "ON TERMINAL" },
                    { value: "6", label: "LEFT" },
                    { value: "0", label: "ANNOUNCED" },
                  ]}
                  value={selectRef.current}
                  onChange={(e) => {
                    setSelect(e);
                    document.getElementById("vins").value = ""; 
                  }}
                  placeholder="SELECT STATE"
                />
                <br />
                <hr />
                <br />
                {/* <div className="w-full mb-4">
                                    <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
                                        <input onClick={()=>{
                                            if(ToggleRef.current){
                                                setToggle(false)
                                            }else{
                                                setToggle(true)
                                            }
                                        }} type="checkbox" name="toggle" id="toggle" className={"focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +(ToggleRef.current ? '-right-0.5' : '')}/>
                                        <label for="toggle" className={"focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " + (ToggleRef.current ? 'bg-blue-500' : 'bg-gray-300')}></label>
                                    </div>
                                    <label for="toggle" className="text-md text-gray-700">LOCAL COMPOUND</label>
                                </div> */}
                <div className="w-full mt-2 mb-2 justify-center flex">
                  <textarea
                    id="vins"
                    disabled={selectRef.current ? true : false}
                    onChange={()=>setMessageError("")}
                    className={
                      "placeholder-gray-800 placeholder-opacity-20 rounded border-2 w-full pl-4 pt-2 focus:outline-none focus:border-blue-500 " +
                      (isTabla ? "text-lg" : "text-3xl")
                    }
                    rows="12"
                  ></textarea>
                </div>
                {messageErrorRef.current != "" && errorRef && (
                  <div className="text-center">
                    <span className="text-red-600">
                      {messageErrorRef.current}
                    </span>
                  </div>
                )}

                <div className="hidden" id="spin">
                  <div className="w-full flex justify-center pt-3">
                    <Loader ref={childRef} type="3" />
                  </div>
                </div>
                <div className="w-full mt-2 mb-2 justify-end flex">
                  <button
                    onClick={() => buscar("vin")}
                    className="rounded pl-2 pr-2 pt-1 pb-1 border-2 border-gray-700 focus:outline-none hover:bg-gray-700 hover:text-white text-gray-700 transition-color duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}

          {TabRef.current === "mov" && (
            <div className="mb-4 mt-2 justify-center flex">
              <div className="w-2/3 p-4 mt-5 rounded">
                <div className="w-full justify-end flex">
                  <div className="mr-2">
                    <SelecDate setDate={setDate_} />
                  </div>

                  <div
                    className="ml-2"
                    onClick={() => {
                      setSelect("");
                      document.getElementById("vins").value = ""; 
                      setDate_([]);
                      setMessageError("");
                    }}
                  >
                    <svg
                      class="w-6 h-6 text-red-500 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                {/* <div className="w-full mb-4">
                                    <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
                                        <input onClick={()=>{
                                            if(ToggleRef.current){
                                                setToggle(false)
                                            }else{
                                                setToggle(true)
                                            }
                                        }} type="checkbox" name="toggle" id="toggle" className={"focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +(ToggleRef.current ? '-right-0.5' : '')}/>
                                        <label for="toggle" className={"focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " + (ToggleRef.current ? 'bg-blue-500' : 'bg-gray-300')}></label>
                                    </div>
                                    <label for="toggle" className="text-md text-gray-700">LOCAL COMPOUND</label>
                                </div> */}
                <div className="mt-2 mb-2 justify-center flex">
                  <textarea
                    id="vins"
                    // disabled={selectRef.current ? true : false}
                    onChange={()=>setMessageError("")}
                    className={
                      "placeholder-gray-800 placeholder-opacity-20 rounded border-2 w-full pl-4 pt-2 focus:outline-none focus:border-blue-500 " +
                      (isTabla ? "text-lg" : "text-3xl")
                    }
                    rows="12"
                  ></textarea>
                </div>
                {messageErrorRef.current != "" && errorRef && (
                  <div className="text-center">
                    <span className="text-red-600">
                      {messageErrorRef.current}
                    </span>
                  </div>
                )}
                <div className="hidden" id="spin">
                  <div className="w-full flex justify-center pt-3">
                    <Loader ref={childRef} type="3" />
                  </div>
                </div>
                <div className="w-full mt-2 mb-2 justify-end flex">
                  <button
                    onClick={() => buscar("mov")}
                    className="rounded pl-2 pr-2 pt-1 pb-1 border-2 border-gray-700 focus:outline-none hover:bg-gray-700 hover:text-white text-gray-700 transition-color duration-300"
                  >
                    Search
                  </button>
                </div>
                {/* {errorRef.current && (
                  <div className="w-full mt-3 text-center text-red-500">
                    There is no data available
                  </div>
                )} */}
              </div>
            </div>
          )}
          {TabRef.current === "eoc" && (
            <div className="w-full mb-2 mt-20 justify-center flex">
              {/* <table className="border-solid border-2 border-gray-500">
                <tr className="border-solid border-2 border-gray-500">
                  <td className="border-solid border-2 border-gray-500 p-2 text-center">1</td>
                  <td className="border-solid border-2 border-gray-500 p-2">2</td>
                  <td className="border-solid border-2 border-gray-500 p-2">3</td>
                  <td className="border-solid border-2 border-gray-500 p-2">1</td>
                  <td className="border-solid border-2 border-gray-500 p-2">2</td>
                  <td className="border-solid border-2 border-gray-500 p-2">3</td>
                </tr>
                <td className="border-solid border-2 border-gray-500 p-2"><input type="checkbox"></input>
                </td>
                  <td className="border-solid border-2 border-gray-500 p-2">2</td>
                  <td className="border-solid border-2 border-gray-500 p-2">3</td>
                  <td className="border-solid border-2 border-gray-500 p-2">1</td>
                  <td className="border-solid border-2 border-gray-500 p-2">2</td>
                  <td className="border-solid border-2 border-gray-500 p-2">3</td>
              </table> */}
            </div>
          )}
        </div>
      </div>

      <div className={isTabla ? "col-span-6" : "hidden"}>
        <Table
          configColumns={"search"}
          orderColumns={true}
          montarTabla={montarTabla}
          data={dataRef.current}
          columns={columnsRef.current}
          download={true}
          download_title={"search"}
        />
      </div>
    </div>
  );
};

export default SearchComp;

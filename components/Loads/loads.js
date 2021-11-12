import React, { useEffect, useRef } from "react";
import useState from "react-usestateref";
import ReactTooltip from "react-tooltip";
import { getLoads, removeVehiclesFromLoad } from "../functions/datafunctions";
import Table from "../Table";
import Blackback from "../../components/utilities/blackback";
import Modal from "../../components/utilities/modal";
import Loader from "../../components/Loader";
import downloadPrintLoad from "../yard/loads/PrintLoad";
const loads = () => {
  const childRef = useRef();
  var [data, setData, dataRef] = useState([]);
  var [columns, setColumns, columnsRef] = useState([]);
  var [showModal, setShowModal, showModalRef] = useState(false);
  var [columnsInfo, setColumnsInfo, columnsInfoRef] = useState([]);
  var [dataInfo, setDataInfo, dataInfoRef] = useState([]);
  var [vinsToDelete, setVinsToDelete, vinsToDeleteRef] = useState({ vins: [] });
  var [showAlertUnload, setShowAlertUnload, showAlertUnloadRef] =
    useState(false);
  var [showMessageUnload, setShowMessageUnload, showMessageUnloadRef] =
    useState("");
  var [showConfirmLoad, setShowConfirmLoad, showConfirmLoadRef] =
    useState(false);

  const MontarTabla = () => {
    getLoads().then((res) => {
      if (res.error === false) {
        let columns = [
          { Header: "", accessor: "actions", width: 60 },
          { Header: "CARRIER", accessor: "carrier" },
          { Header: "RULE", accessor: "rule" },
          { Header: "CODE", accessor: "identificator" },
          { Header: "CREATED AT", accessor: "created_at" },
        ];
        console.log("das",res.data);
        res.data.forEach((element, i) => {
          let json = {
            actions: (
              <>
                <div className="flex justify-center">
                  <svg
                    data-for={"showinfo_" + i}
                    onClick={() => mostrarInformacion(element)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-eye cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  <ReactTooltip
                    backgroundColor="#000"
                    id={"showinfo_" + i}
                    effect="solid"
                    place="bottom"
                    aria-haspopup="true"
                    role="example"
                  >
                    Show info
                  </ReactTooltip>
                </div>
              </>
            ),
          };
          element.actions = json["actions"];
        });
        setColumns(columns);
        setData(res.data);
      }
    });
  };
  useEffect(() => {
    MontarTabla();
  }, []);
  const removeVinToLoad = (vin) => {
    document.getElementById("spin").classList.remove("hidden");
    console.log(vin);
    removeVehiclesFromLoad(vin).then((res) => {
      console.log(res);
      if (res.error === false) {
        document.getElementById("spin").classList.add("hidden");
        setShowMessageUnload(res.message);
        document.getElementById("message").classList.remove("hidden");
        MontarTabla();
        mostrarInformacion();
        setTimeout(function () {
          setShowAlertUnload(false);
        }, 2000);
      }
    });
  };
  const mostrarInformacion = (element) => {
    if (element) {
      let columnas = JSON.parse(localStorage.getItem("profile"));
      let new_arrayColumnas = [];
      new_arrayColumnas.push({ Header: "", accessor: "actions", width: 60 });
      columnas["config"]["stock"].forEach((col) => {
        if (col.active == 1) {
          new_arrayColumnas.push(col);
        }
      });

      element.vehicles.map((vehicle, i) => {
        if (!vehicle.actions) {
          vehicle.country = vehicle.country.name;
          vehicle.color = vehicle.color.name;
          vehicle.model = vehicle.model.name;
          vehicle.shipping_rule = vehicle.shipping_rule.name;
          vehicle.state = vehicle.state.name;
          let json = {
            actions: (
              <>
                <div className="flex justify-center">
                  <svg
                    onClick={() => {
                      setShowAlertUnload(true),
                        vinsToDeleteRef.current.vins.push(vehicle.vin);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="red"
                    className="bi bi-trash cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                  <ReactTooltip
                    backgroundColor="#000"
                    id={"unload_" + i}
                    effect="solid"
                    place="bottom"
                    aria-haspopup="true"
                    role="example"
                  >
                    delete
                  </ReactTooltip>
                </div>
              </>
            ),
          };
          vehicle.actions = json["actions"];
        }
      });
      setColumnsInfo(new_arrayColumnas);
      setDataInfo(element.vehicles);
      setShowModal(true);
    } 
    if (dataRef.current.length <= 0) {
        setShowModal(false);
    }
  };
  return (
    <>
      {showModalRef.current && (
        <Blackback>
          <Modal size={true} closeModal={setShowModal} header="Loads">
            <Table
              pagDefault={5}
              data={dataInfoRef.current}
              columns={columnsInfoRef.current}
              download={true}
              download_title={"Load"}
              montarTablaLoads={MontarTabla}
            />
            <div className="flex justify-center pt-4">
              <div className="pr-4">
                <button
                  onClick={() => setShowConfirmLoad(true)}
                  className=" border-2 border-green-500 text-lg text-green-500 rounded hover:bg-green-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5"
                >
                  Confirm Load
                </button>
              </div>
              <div>
                <button
                  onClick={() => setShowModal(false)}
                  className="border-2 border-red-500 text-lg text-red-500 rounded hover:bg-red-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5"
                >
                  Cancel
                </button>
              </div>
            </div>

          </Modal>
        </Blackback>
      )}
      {showConfirmLoadRef.current && (
        <Blackback>
          <Modal closeModal={setShowAlertUnload} header="Confirm Load">
            <div className="text-center text-xl">
              <p>Are you sure you want to confirm this load?</p>
              <br />
              <div className="hidden" id="spin">
                <div className="w-full  pt-3 flex justify-center">
                  <Loader ref={childRef} type="3" />
                </div>
              </div>
              <div className="" id="message">
                <div className="w-full pt-3 flex justify-center text-center text-green-500 text-base">
                  {showMessageUnloadRef.current}
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-center pt-2">
              <div className="grid grid-cols-2 w-3/6">
                <div className="text-center">
                  <span className="cursor-pointer" onClick={()=><downloadPrintLoad function={download_}></downloadPrintLoad>}>YES</span>
                </div>
                <div className="text-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowConfirmLoad(false)}
                  >
                    NO
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        </Blackback>
      )}
      {showAlertUnloadRef.current && (
        <Blackback>
          <Modal closeModal={setShowAlertUnload} header="unload vehicle">
            <div className="text-center text-xl pb-8">
              <p>Are you sure you want to unload this vehicle?</p>
              <br />
              <p className="text-red-500">{vinsToDeleteRef.current.vins[0]}</p>
              <div className="hidden" id="spin">
                <div className="w-full  pt-3 flex justify-center">
                  <Loader ref={childRef} type="3" />
                </div>
              </div>
              <div className="" id="message">
                <div className="w-full pt-3 flex justify-center text-center text-green-500 text-base">
                  {showMessageUnloadRef.current}
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-center pt-2">
              <div className="grid grid-cols-2 w-3/6">
                <div className="text-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => removeVinToLoad(vinsToDeleteRef.current)}
                  >
                    YES
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowAlertUnload(false)}
                  >
                    NO
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        </Blackback>
      )}
      <div className="py-4 px-4">
        <Table
          data={dataRef.current}
          columns={columnsRef.current}
          calendar={true}
          download={true}
          calendar_column={"created_at"}
          download_title={"load"}
        />
      </div>
    </>
  );
};

export default loads;

import React, { useEffect, useRef } from "react";
import Select from "react-select";
import useState from "react-usestateref";
import {
  getDesings,
  getCheckVins,
  sendDataInspection,
} from "./functions/datafunctions";
import Blackback from "./../components/utilities/blackback";
import Modal from "./../components/utilities/modal";
import Loader from "../components/Loader";
const formCreateInspection = (props) => {
  const childRef = useRef();
  const [toggleStatus, setToggleStatus, toggleStatusRef] = useState(false);
  const [designs, setDesigns, designsRef] = useState([]);
  const [checkVins, setCheckVins, checkVinsRef] = useState({ vins: "" });
  const [inspection, setInspection, inspectionRef] = useState([
    {
      name: "",
      inspType: { typeId: 0, values: [] },
      multipleVin: false,
      file: false,
      totalNum: 0,
      flexDisplay: false,
      dt_start: "",
    },
  ]);
  const [typeInpections, setTypeInpections, typeInpectionsRef] = useState();
  const [badVins, setBadVins, badVinsRef] = useState([]);
  const [menssageError, setMessagesError, messagesErrorRef] = useState("");
  const [textAreaValue, setTextAreaValue, textAreaValueRef] = useState("");
  const [multiVin, setMultiVin, multiVinRef] = useState(false);
  var [cerrar, setcerrar, cerrarRef] = useState(true);
  const [idInspection, setIdInspection, idInspectionRef] = useState(0);
  const [messageResponse, setMessageResponse, messageResponseRef] =
    useState(false);
  const cerrarModal = () => {
    setcerrar(true);
  };
  const toggleFlexInspect = () => {
    if (toggleStatusRef.current) {
      setToggleStatus(false);
    } else {
      setToggleStatus(true);
    }
    inspectionRef.current[0].flexDisplay = toggleStatusRef.current;
  };
  const toggleMutlivin = () => {
    if (multiVinRef.current) {
      setMultiVin(false);
    } else {
      setMultiVin(true);
    }
    inspectionRef.current[0].multipleVin = multiVinRef.current;
  };
  useEffect(() => {
    getDesings().then((res) => {
      setDesigns(res.data);
    });
  }, []);
  const saveVinsToCheck = (vins) => {
    setTextAreaValue(vins);
    var vinsSplit = vins.split("\n");
    var arrayVins = [];
    if (!vinsSplit) {
      checkVinsRef.current.vins = "";
    } else {
      for (var i = 0; i < vinsSplit.length; i++) {
        if (/\S/.test(vinsSplit[i])) {
          if (!arrayVins.includes(vinsSplit[i].trim())) {
            arrayVins.push(vinsSplit[i].trim());
          }
        }
      }
      checkVinsRef.current.vins = arrayVins;
      sendCehckVins(checkVinsRef.current);
    }
  };
  const sendCehckVins = (vins) => {
    getCheckVins(vins).then((res) => {
      setBadVins(res.data);
      setMessageResponse(true);
    });
    if (badVinsRef.current) {
      inspectionRef.current[0].inspType.values = checkVinsRef.current.vins;
    }
  };
  const checkData = () => {
    document.getElementById("spin").classList.remove("invisible")
    let dataVinOrModelCorrect = false;
    console.log(inspectionRef.current[0]);
    if (
      inspectionRef.current[0].name &&
      inspectionRef.current[0].dt_start &&
      inspectionRef.current[0].inspType.typeId
    ) {
      if (typeInpectionsRef.current == "MODEL") {
        if (
          inspectionRef.current[0].totalNum &&
          inspectionRef.current[0].inspType.values != ""
        ) {
          dataVinOrModelCorrect = true;
        } else {
          dataVinOrModelCorrect = false;
        }
      } else if (typeInpectionsRef.current == "VIN") {
        if (!badVinsRef.current) {
          dataVinOrModelCorrect = true;
        } else {
          dataVinOrModelCorrect = false;
        }
      }
      if (dataVinOrModelCorrect) {
        sendDataInspection(inspectionRef.current[0]).then((res) => {
          setIdInspection(res.inspectionId);
          document.getElementById("spin").classList.remove("invisible")
          props.clickFunction(inspectionRef.current, idInspectionRef.current);
        });
      } else {
        setMessagesError("***Error, make sure all fields are correct***");
      }
    } else {
      setMessagesError("***Error, make sure all fields are correct***");
    }
  };
  return (
    <>
      {badVinsRef.current && !cerrarRef.current && (
        <Blackback>
          <Modal header={"Incorrect VINS"} closeModal={cerrarModal}>
            <div className="w-full text-center h-468px overflow-x-auto">
              {badVinsRef.current.map((vin, item) => {
                return (
                  <>
                    <p className="pb-4 text-red-700">{vin}</p>
                  </>
                );
              })}
            </div>
          </Modal>
        </Blackback>
      )}
      <div className="grid grid-cols-1 pt-16">
        <div className="text-md font-medium flex justify-center pb-4 text-base tracking-wider">
          Flexible Display
        </div>
        <div className="flex justify-center">
          <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
            <input
              onClick={() => {
                toggleFlexInspect();
              }}
              type="checkbox"
              name="toggle"
              id="toggle"
              className={
                "focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +
                (toggleStatusRef.current ? "-right-0.5" : "")
              }
            />
            <label
              for="toggle"
              className={
                "focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " +
                (toggleStatusRef.current ? "bg-blue-500" : "bg-gray-300")
              }
            ></label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 pt-12">
        <div className="inherit justify-end">
          <label for="name" className="pb-2 text-base tracking-wider">
            Name
          </label>
          <input
            type="text"
            className="w-64 border-2 px-3 py-3 text-base h-4/5 rounded-lg focus:outline-none focus:border-blue-700"
            placeholder="Name"
            id="name"
            name="name"
            onChange={(e) => {
              setMessagesError("");
              inspectionRef.current[0].name = e.target.value;
            }}
          />
        </div>
        <div className="inherit justify-start">
          <label for="name" className="pb-2 text-base tracking-wider">
            Date
          </label>
          <input
            type="date"
            className="w-64 border-2  px-3 py-3 text-base h-4/5 rounded-lg focus:outline-none focus:border-blue-700"
            placeholder="Date"
            id="date"
            name="date"
            onChange={(e) => {
              setMessagesError("");
              inspectionRef.current[0].dt_start = e.target.value;
            }}
          />
        </div>
        <div className="inherit justify-end h-4/5">
          <label for="name" className="pb-2 text-base tracking-wider">
            Type
          </label>
          <Select
            onChange={(e) => {
              setMessagesError("");
              setTypeInpections(e.label);
              inspectionRef.current[0].inspType.typeId = e.value;
              if (e.label == "MODEL") {
                setBadVins([]);
                setTextAreaValue("");
                checkVinsRef.current.vins = [];
                inspectionRef.current[0].inspType.values = [];
              }
              if (e.label == "VIN") {
                inspectionRef.current[0].totalNum = "";
                inspectionRef.current[0].inspType.values = [];
              }
            }}
            className=" w-64 focus:outline-none focus:border-blue-400"
            options={[
              { value: "", label: "Select a option" },
              { value: 2, label: "MODEL" },
              { value: 1, label: "VIN" },
            ]}
          />
        </div>
        {typeInpectionsRef.current == "MODEL" && (
          <div className="inherit justify-start">
            <label for="name" className="pb-2 text-base tracking-wider">
              Units to check
            </label>
            <div className="w-full justify-start flex">
              <input
                onChange={(e) => {
                  setMessagesError("");
                  var valid = /^\2?\d*$|^\?[\d]*$/;
                  var number = /d+|[\d]*|[\d]+/;
                  if (!valid.test(e.target.value)) {
                    var n = e.target.value.match(number);
                    e.target.value = n ? n[0] : "";
                  } else {
                    inspectionRef.current[0].totalNum = e.target.value;
                  }
                }}
                type="numbersOnly"
                className="w-64 border-2  px-3 py-3 text-lg h-4/5 rounded-lg focus:outline-none focus:border-blue-700"
                placeholder="Units to check"
                name=""
              />
            </div>
          </div>
        )}
        {typeInpectionsRef.current == "VIN" && (
          <div className="inherit justify-start pl-4">
            <label for="name" className="pb-2 text-base tracking-wider">
              Duplicate VIN
            </label>
            <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
              <input
                onClick={() => {
                  toggleMutlivin();
                }}
                type="checkbox"
                name="toggleMultiVin"
                id="toggleMultiVin"
                className={
                  "focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +
                  (multiVinRef.current ? "-right-0.5" : "")
                }
              />
              <label
                for="toggleMultiVin"
                className={
                  "focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " +
                  (multiVinRef.current ? "bg-blue-500" : "bg-gray-300")
                }
              ></label>
            </div>
          </div>
        )}
      </div>
      {typeInpectionsRef.current == "MODEL" && (
        <div className="grid grid-cols-1 pt-6">
          <div className="inherit justify-center">
            <label for="model" className="pb-2 text-lg tracking-wider">
              Model
            </label>
            <Select
              onChange={(e) => {
                setMessagesError("");
                if (e != "") {
                  console.log(e);
                  for (let i = 0; i < e.length; i++) {
                    inspectionRef.current[0].inspType.values.push(e[i].label);
                  }
                }
              }}
              isMulti
              className="w-64 focus:outline-none  focus:border-blue-400"
              options={designsRef.current.map((design) => {
                return design;
              })}
            />
          </div>
        </div>
      )}
      {typeInpectionsRef.current == "VIN" && (
        <div className="grid grid-cols-1 pt-6 ">
          <div className="inherit justify-center ">
            <label for="date">VINS</label>
            <textarea
              className="w-96 border-2  px-3 py-3 text-lg rounded-lg focus:outline-none focus:border-blue-700"
              onChange={(e) => {
                setMessagesError("");
                setMessageResponse(false);
                saveVinsToCheck(e.target.value);
              }}
            />
            {textAreaValueRef.current != "" && messageResponseRef.current ? (
              <div className="text-center pt-3">
                {badVinsRef.current && (
                  <p className="text-red-500">
                    Incorrect Vins!{" "}
                    <svg
                      onClick={() => {
                        setcerrar(false);
                      }}
                      className="unsetImportant cursor-pointer bi bi-eye"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </p>
                )}
                {!badVinsRef.current && (
                  <p className="text-green-600">All VINS are correct!</p>
                )}
              </div>
            ) : (
              textAreaValueRef.current && (
                <div className="w-full flex justify-center pt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="animate-spin bi bi-arrow-repeat"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path
                      fill-rule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    />
                  </svg>
                </div>
              )
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 pt-8 ">
        {messagesErrorRef.current && (
          <div className="text-center text-red-600">
            <p>{messagesErrorRef.current}</p>
          </div>
        )}
        <div className="w-full flex justify-center pt-3 invisible" id="spin">
          <Loader ref={childRef} type="3" />
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() => checkData()}
            className="w-96  p-3 bg-blue-logo mt-5 text-center hover:bg-gray-900 rounded-lg text-white text-xl duration-300 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default formCreateInspection;

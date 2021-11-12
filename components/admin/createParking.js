import React, {useRef} from "react";
import Layout from "../Layout";
import useState from "react-usestateref";
import { createPosition } from "../functions/datafunctions";
import Loader from "../Loader";
const createParking = () => {
  const childRef = useRef();
  var [name, setName, nameRef] = useState("");

  var [num, setNum, numRef] = useState(0);

  var [filas, setFilas, filasRef] = useState([]);

  var [error, setError, errorRef] = useState("");
  var [success, setSuccess, successRef] = useState(false);

  var [capacity, setCapacity, capacityRef] = useState("");

  const crear_filas = (num) => {
    setError("");

    let filas_ = [];
    for (let i = 1; i <= num; i++) {
      filas_.push({ name: nameRef.current + "." + i, slots: 0 });
    }

    setFilas(filas_);
    console.log(filas_);
  };

  const change_slot = (fil, e) => {
    let filas_ = filasRef.current;

    filas_.forEach((elm) => {
      if (fil.split(".")[1] === "1") {
        elm.slots = e;
      } else {
        if (elm.name === fil) {
          elm.slots = e;
        }
      }
    });

    setFilas((filas_) => [...filas_]);
  };

  const crear = () => {
    document.getElementById("spin").classList.remove("hidden")
    if (nameRef.current != "" && numRef.current == 0) {
      console.log("entra");

      let json = {
        name: nameRef.current,
        type: 1,
        compoundId: localStorage.compound_id,
        capacity: capacityRef.current ? capacityRef.current : 0,
      };
      crearPos(json);

      return;
    }

    if (filasRef.current.length == 0) {
      setError("You have to create the Parking!");
      return;
    }

    let error_ = false;
    filasRef.current.forEach((elm) => {
      if (elm.slots == 0) {
        error_ = true;
        setSuccess(false);
        setError("Rows must be 1 slot at least");
      }
    });

    if (error_) {
      return;
    } else {
      setError("");
    }

    console.log(filasRef.current);

    let ultNum = filasRef.current[0].slots;
    let new_array = [];
    let array_num = [];

    filasRef.current.forEach((elm) => {
      if (elm.slots == ultNum) {
        array_num.push(elm.name.split(".")[1]);
        if (filasRef.current.length == Number(elm.name.split(".")[1])) {
          new_array.push([array_num, ultNum]);
        }
      } else {
        new_array.push([array_num, ultNum]);
        array_num = [];
        ultNum = elm.slots;
        array_num.push(elm.name.split(".")[1]);
      }
    });

    let array_json = "";

    new_array.forEach((dato, i) => {
      let text = dato[0][0] + "-" + dato[0][dato[0].length - 1] + ":" + dato[1];
      if (i == new_array.length - 1) {
        array_json = array_json + text;
      } else {
        array_json = array_json + text + ",";
      }
    });

    console.log(array_json);

    let json = {
      name: nameRef.current,
      type: 1,
      compoundId: localStorage.compound_id,
      capacity: capacityRef.current ? capacityRef.current : null,
      lanes: array_json.length > 0 ? array_json : null,
    };

    console.log(json);

    crearPos(json);
  };

  const crearPos = (json) => {
    createPosition(json).then((res) => {
      if (res.error === false) {
        document.getElementById("spin").classList.add("hidden")
        setError("");
        setSuccess(true);

        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        setSuccess(false);
        setError(res.message);
      }
      console.log(res);
    });
  };

  return (
    <Layout>
      <div className="py-4 px-4">
        <div className="w-full space-x-5 flex">
          <div className="w-1/2 border-2 p-4 rounded-xl">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={nameRef.current}
              className="w-full border-2 border-black px-3 py-3 text-xl rounded-lg focus:outline-none focus:border-blue-700"
              placeholder="Parking Name"
            />

            <input
              type="number"
              onChange={(e) => {
                setNum(e.target.value);
                crear_filas(e.target.value);
              }}
              disabled={nameRef.current ? false : true}
              className="w-full border-2 border-black px-3 py-3 text-xl rounded-lg mt-5 focus:outline-none focus:border-blue-700"
              placeholder="Number of Rows"
            />

            <input
              type="number"
              onChange={(e) => setCapacity(e.target.value)}
              value={capacityRef.current}
              className="w-full border-2 border-black px-3 py-3 text-xl mt-5 rounded-lg focus:outline-none focus:border-blue-700"
              placeholder="Capacity"
            />

            <button
              onClick={() => crear()}
              className="w-full p-3 bg-gray-700 mt-5 hover:bg-gray-900 rounded-lg text-white text-xl duration-300 transition-colors"
            >
              Create Parking
            </button>

            <div className="w-full flex justify-center items-center">
              <div className="hidden" id="spin">
                <div className="w-full  pt-3 flex justify-center">
                  <Loader ref={childRef} type="3" />
                </div>
              </div>
              {errorRef.current && (
                <span className="text-red-500">{errorRef.current}</span>
              )}

              {successRef.current && (
                <span className="text-green-500">Created successfully!</span>
              )}
            </div>
          </div>

          {filasRef.current.length > 0 && (
            <div className="w-1/2 border-2 p-4 rounded-xl h-full-screen overflow-auto">
              <div className="w-full flex justify-center items-center">
                <div className="w-1/3">
                  <span className="text-xl font-medium">NAME</span>
                </div>
                <div className="w-2/3">
                  <span className="text-xl font-medium">SLOTS</span>
                </div>
              </div>

              {filasRef.current.map((fila, key) => {
                return (
                  <div
                    key={key}
                    className="w-full flex justify-center items-center"
                  >
                    <div className="w-1/3">
                      <span className="text-xl font-medium pt-1">
                        {fila.name}
                      </span>
                    </div>
                    <div className="w-2/3">
                      <input
                        type="number"
                        onChange={(e) => change_slot(fila.name, e.target.value)}
                        value={fila.slots}
                        placeholder="Slots"
                        className="w-full border-2 border-black px-2 py-2 text-xl rounded-lg mt-5 focus:outline-none focus:border-blue-700"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default createParking;

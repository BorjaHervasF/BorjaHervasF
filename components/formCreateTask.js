import React, { useEffect, useRef } from "react";
import Select from "react-select";
import useState from "react-usestateref";
import Loader from "../components/Loader";
import LayoutInspection from "../components/yard/reworks/Reworks"
import { sendDataTask, getNodeTypes } from "./functions/datafunctions";
const formCreateTask = (props) => {
  const childRef = useRef();
  const [toggleStatus, setToggleStatus, toggleStatusRef] = useState(false);
  const [typeInpections, setTypeInpections, typeInpectionsRef] = useState([]);
  const [multiTask, setMultiTask, multiTaskRef] = useState(false);
  const [tasks, setTasks, tasksRef] = useState([
    {
      inspection: props.dataInspection[0],
      tasks: [
        {
          id: "0-0",
          flexDisplay: false,
          multiTask: false,
          name: "",
          nodeType: null,
          tasks: [],
        },
      ],
    },
  ]);
  const [infoOneTask, setInfoTwoTask, infoOneTaskRef] = useState();
  const [oldIdSelected, setOldIdSelected, oldIdSelectedRef] = useState("");
  const [idCurrent, setIdCurrent, idCurrentRef] = useState("0-0");
  const [idInspection, setIdInspection, idInspectionRef] = useState(
    props.idInspection
  );
  const [nodeType, setNodeType, nodeTypeRef] = useState([]);
  const [currentTask, setCurrentTask, currentTaskRef] = useState([
    {
      id: "0-0",
      flexDisplay: false,
      multiTask: false,
      name: "",
      nodeType: null,
      tasks: [],
    },
  ]);
  const toggleFlexDisplay = () => {
    if (toggleStatusRef.current) {
      setToggleStatus(false);
    } else {
      setToggleStatus(true);
    }
  };
  useEffect(() => {
    setIdCurrent("0-0");
    selectCurrentTask(idCurrentRef.current);
    getTypes();
  }, []);
  const sendTask = (lastId) => {
    document.getElementById("spin").classList.remove("hidden")
    
    if (checkData(lastId)) {
      let objectToSend = {
        inspectionId: idInspectionRef.current,
        tasks: tasksRef.current[0].tasks,
      };
      sendDataTask(objectToSend).then((res) => {
        document.getElementById("spin").classList.add("hidden")
        props.cerrar()
      });
    }
  };
  const addTask = (idSelected) => {
    if (checkData(idCurrentRef.current)) {
      resetInfo();
      let idParentTask = "";
      if (typeof idSelected == "string") {
        idParentTask = idSelected.split("-");
        idParentTask.pop();
        var coordinate = tasksRef.current;
        let count = 0;
        let id = "";
        idParentTask.forEach((cord) => {
          coordinate = coordinate[parseInt(cord)];
          id = id + cord;

          if (count <= idParentTask.length) {
            id = id + "-";
            coordinate = coordinate["tasks"];
          }
          count++;
        });
        setIdCurrent(id + coordinate.length);
        coordinate.push({
          id: idCurrentRef.current,
          flexDisplay: false,
          multiTask: false,
          name: "",
          nodeType: null,
          tasks: [],
        });
        setOldIdSelected(idSelected);
        paintSelectWhenAddTask(idCurrentRef.current);
      }
    }
  };

  const addSubTask = (idSelected) => {
    if (checkData(idSelected)) {
      resetInfo();
      let idParentTask = "";
      if (typeof idSelected == "string") {
        idParentTask = idSelected.split("-");
        var coordinate = tasksRef.current;
        idParentTask.forEach((cord) => {
          coordinate = coordinate[parseInt(cord)];
          coordinate = coordinate["tasks"];
        });
        setIdCurrent(idSelected + "-" + coordinate.length);
        coordinate.push({
          id: idSelected + "-" + coordinate.length,
          flexDisplay: false,
          multiTask: false,
          name: "",
          nodeType: null,
          tasks: [],
        });
        setOldIdSelected(idSelected);
        paintSelectWhenAddTask(idCurrentRef.current);
      }
    }
  };

  const removeTask = (idSelected) => {
    let idParentTask = "";
    if (typeof idSelected == "string") {
      idParentTask = idSelected.split("-");
      var coordinate = tasksRef.current;
      let count = 0;
      idParentTask.forEach((cord) => {
        if (count < idParentTask.length - 1) {
          coordinate = coordinate[parseInt(cord)];
          coordinate = coordinate["tasks"];
        } else {
          coordinate.splice(parseInt(cord), 1);
          reorderedTasks(coordinate, 0, idParentTask);
        }
        count++;
      });
      let changeCurrentId = idSelected.split("-");
      let CurrentId = changeCurrentId[changeCurrentId.length - 1];
      let changeId = "";
      if (changeCurrentId.length < 3) {
        if (CurrentId > 0) {
          changeId = changeCurrentId.splice(
            changeCurrentId.length - 1,
            1,
            CurrentId - 1
          );
        } else {
          changeId = changeCurrentId.splice(
            changeCurrentId.length - 1,
            1,
            CurrentId
          );
        }
      } else {
        changeCurrentId.pop();
        setIdCurrent(changeCurrentId.join("-"));
        selectCurrentTask(changeCurrentId.join("-"));
      }
      setIdCurrent(changeCurrentId.join("-"));
      selectCurrentTask(changeCurrentId.join("-"));
    }
  };
  const reorderedTasks = (tasks, positionDelete, idRemoved) => {
    let toDelete = positionDelete;
    let removed = idRemoved;
    removed = removed[removed.length - 1];
    tasks.map((element) => {
      let elementRes = 0;
      let id = "";
      id = element.id.split("-");
      if (toDelete <= 0) {
        toDelete = id.length - 1;
      }
      elementRes = id[toDelete];
      if (elementRes > 0 && elementRes > removed) {
        id.splice(toDelete, 1, parseInt(elementRes - 1));
      }
      element.id = id.join("-");
      if (element.tasks != null) {
        reorderedTasks(element.tasks, toDelete, removed);
      }
    });
  };

  const paintSelectWhenAddTask = (idCreated) => {
    resetInfo();
    document
      .getElementById(oldIdSelectedRef.current)
      .classList.remove("nodeActive");
    setTimeout(
      () => (document.getElementById(idCreated).className = "nodeActive"),
      100
    );
  };
  const selectCurrentTask = (idSelected) => {
    if (!oldIdSelected.current) {
      document.getElementById(idCurrentRef.current).className = "nodeActive";
    }
    if (checkData(idCurrentRef.current)) {
      resetInfo();
      setTimeout(
        () => (
          document
            .getElementById(oldIdSelectedRef.current)
            .classList.remove("nodeActive"),
          document
            .getElementById(idCurrentRef.current)
            .classList.remove("nodeActive"),
          (document.getElementById(idSelected).className = "nodeActive")
        ),
        100
      );
      setOldIdSelected(idCurrentRef.current);
      let idParentTask = "";
      if (typeof idSelected == "string") {
        idParentTask = idSelected.split("-");
        var coordinate = tasksRef.current;
        let count = 0;
        let id = "";
        idParentTask.forEach((cord) => {
          coordinate = coordinate[parseInt(cord)];
          id = id + cord;
          if (count < idParentTask.length - 1) {
            id = id + "-";
            coordinate = coordinate["tasks"];
          }
          count++;
        });
        setCurrentTask(coordinate);
        document.getElementById("name").value = coordinate.name;

        if (coordinate.nodeType != null) {
          console.log(coordinate);
          setTypeInpections(
            nodeTypeRef.current.find(
              (element) => element.value == coordinate.nodeType
            )
          );
        } else {
          console.log("Estoy vacio");
          setTypeInpections(coordinate.nodeType);
        }
        setMultiTask(coordinate.multiTask);
        setToggleStatus(coordinate.flexDisplay);
        setIdCurrent(idSelected);
      }
    }
  };
  const checkData = (idCurrent) => {
    if (idCurrent) {
      let idParentTask = "";
      if (typeof idCurrent == "string") {
        idParentTask = idCurrent.split("-");
        var coordinate = tasksRef.current;
        let count = 0;
        let id = "";
        idParentTask.forEach((cord) => {
          coordinate = coordinate[parseInt(cord)];
          id = id + cord;
          if (count < idParentTask.length - 1) {
            id = id + "-";
            coordinate = coordinate["tasks"];
          }
          count++;
        });
        if (coordinate.name) {
          if (coordinate.flexDisplay) {
            if (coordinate.nodeType) {
              setIdCurrent(coordinate.id);
              return true;
            }
          }
          if (coordinate.nodeType) {
            setIdCurrent(coordinate.id);
            return true;
          } else if (coordinate.multiTask) {
            setIdCurrent(coordinate.id);
            return true;
          }
        } else {
          return false;
        }
      }
    }
  };
  const getTypes = () => {
    getNodeTypes().then((res) => {
      setNodeType(res.data);
      // nodeTypeRef.current.unshift({value: null, label: "Select a option"})
      console.log(res.data);
    });
  };
  const resetInfo = () => {
    document.getElementById("name").value = "";
    setTypeInpections({ value: null, label: "Select a option" });
    setMultiTask(false);
    setToggleStatus(false);
  };
  const addInfoTask = (input, value) => {
    let idParentTask = "";
    idParentTask = idCurrentRef.current.split("-");
    var coordinate = tasksRef.current;
    let count = 0;
    idParentTask.forEach((cord) => {
      coordinate = coordinate[parseInt(cord)];
      if (count < idParentTask.length - 1) {
        coordinate = coordinate["tasks"];
      }
      count++;
    });
    if (input == "name") {
      coordinate.name = value;
      if (value != "") {
        document.getElementById(idCurrentRef.current).textContent = value;
      } else {
        document.getElementById(idCurrentRef.current).textContent =
          "Insert name";
      }
    } else if (input == "displayFlex") {
      coordinate.flexDisplay = value;
    } else if (input == "multiTask") {
      coordinate.nodeType = null;
      coordinate.flexDisplay = false;
      coordinate.multiTask = value;
    } else if (input == "type") {
      // nodeTypeRef.current.unshift({value: null, label: "Select a option"})
      coordinate.nodeType = value;
    }
  };
  const toggleMultiTask = () => {
    if (multiTaskRef.current) {
      setMultiTask(false);
    } else {
      setMultiTask(true);
      setToggleStatus(false);
      setTypeInpections([]);
    }
  };
  const makeTree = (tasks) => {
    return tasks.map((element) => {
      let paint = paintDiv(element);
      let paint2 = "";

      if (element.tasks != null) {
        paint2 = makeTree(element.tasks);
      }
      console.log(tasks);
      return [
        <li className={tasks.length <= 1 ? 'contents' :''}>
          {paint}
          {paint2 != "" && <ul>{paint2}</ul>}
        </li>,
      ];
    });
  };
  const paintDiv = (task) => {
    return (
      <a
        id={task.id}
        classname="cursor-pointer"
        onClick={() => {
          selectCurrentTask(task.id);
        }}
      >
        {task.name == "" ? "Insert name" : task.name}
      </a>
    );
  };
  return (
    <>
      <div className="bg-gray-100 h-56 w-full flex justify-center overflow-x-auto">
        <br />
        <div className="h-1/6">
          <div class="tree">
            <ul>
              <li>
                <a className="cursor-pointer">
                  {tasksRef.current[0].inspection.name}
                </a>
                <ul>{makeTree(tasksRef.current[0].tasks)}</ul>
              </li>
            </ul>
          </div>
          <div></div>

          <div id="d3Container"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-16">
        <div className="inherit justify-end">
          <div className="flex justify-center">
            <label for="name" className="pb-2 text-base tracking-wider">
              Flexible Display
            </label>
          </div>
          <div className="flex justify-center">
            <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
              <input
                disabled={multiTaskRef.current}
                onChange={() => {
                  addInfoTask("displayFlex", toggleStatusRef.current);
                }}
                onClick={() => {
                  toggleFlexDisplay();
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
        <div className="inherit justify-start pl-8">
          <div className="flex justify-center">
            <label for="name" className="pb-2 text-base tracking-wider">
              MultiTask
            </label>
          </div>
          <div className="flex justify-center">
            <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
              <input
                onChange={() => {
                  addInfoTask("multiTask", multiTaskRef.current);
                }}
                onClick={() => {
                  toggleMultiTask();
                }}
                type="checkbox"
                name="toggleMultiTask"
                id="toggleMultiTask"
                className={
                  "focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +
                  (multiTaskRef.current ? "-right-0.5" : "")
                }
              />
              <label
                for="toggleMultiTask"
                className={
                  "focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " +
                  (multiTaskRef.current ? "bg-blue-500" : "bg-gray-300")
                }
              ></label>
            </div>
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
            onChange={(e) => {
              addInfoTask("name", e.target.value);
              //   tasksRef.current[0].tasks[idCrearRef.current].name =
              //     e.target.value;
            }}
            className="w-64 border-2 px-3 py-3 text-base h-4/5 rounded-lg focus:outline-none focus:border-blue-700"
            placeholder="Name"
            id="name"
            name="name"
          />
        </div>
        <div className="inherit justify-start h-4/5">
          <label for="name" className="pb-2 text-base tracking-wider">
            Type
          </label>
          <Select
            isDisabled={multiTaskRef.current}
            onChange={(e) => {
              setTypeInpections(e);
              addInfoTask("type", e.value);
            }}
            value={typeInpectionsRef.current}
            id="type"
            className=" w-64 focus:outline-none focus:border-blue-400"
            placeholder="Select an option"
            options={nodeTypeRef.current.map((type) => {
              return type;
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 pt-6 ">
        <div className="flex justify-center ">
          <button
            onClick={() => addTask(idCurrentRef.current)}
            className="w-96  p-3 bg-yellow-500 mt-5 text-center hover:bg-gray-900 rounded-lg text-white duration-300 transition-colors text-base tracking-wider"
          >
            Add task
          </button>
        </div>
        {multiTaskRef.current && (
          <div className="flex justify-center ">
            <button
              onClick={() => addSubTask(idCurrentRef.current)}
              className="w-96  p-3 bg-yellow-500 mt-5 text-center hover:bg-gray-900 rounded-lg text-white duration-300 transition-colors text-base tracking-wider"
            >
              Add subtask
            </button>
          </div>
        )}
        {tasksRef.current[0].tasks.length > 1 && (
          <div className="flex justify-center ">
            <button
              onClick={() => removeTask(idCurrentRef.current)}
              className="w-96  p-3 bg-red-500 mt-5 text-center hover:bg-gray-900 rounded-lg text-white duration-300 transition-colors text-base tracking-wider"
            >
              Remove task
            </button>
          </div>
        )}
        <div className="flex justify-center ">
          <button
            onClick={() => sendTask(idCurrentRef.current)}
            className="w-96  p-3 bg-blue-logo mt-5 text-center hover:bg-gray-900 rounded-lg text-white text-base duration-300 transition-colors"
          >
            Confirm
          </button>
        </div>
        <div className="hidden" id="spin">
          <div className="w-full  pt-3 flex justify-center">
          <Loader ref={childRef} type="3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default formCreateTask;

import React, { useEffect } from "react";

const headerCreateTaskInspection = (props) => {
  return (
    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="absolute flex align-center items-center align-middle content-center"
          style={{
            width:
              "calc(100% - 2.5rem - 1rem), top: 50%, transform: translate(-50%, -50%)",
          }}
        >
          <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
            <div
              class="w-0 bg-green-300 py-1 rounded"
              style={{ width: 100 + "%" }}
            ></div>
          </div>
        </div>

        <div class={"w-10 h-10 mx-auto border-gray-200 rounded-full text-lg flex items-center"+props.color}>
          <span class="w-full flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill={props.textColor}
              class="bi bi-ui-checks"
              viewBox="0 0 16 16"
            >
              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-base text-center md:text-base tracking-wider">Create task</div>
    </div>
  );
};

export default headerCreateTaskInspection;

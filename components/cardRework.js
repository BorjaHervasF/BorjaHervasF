import React, { useEffect } from "react";
import Rework from "./yard/reworks/Reworks";
const cardRework = (props) => {
  return (
    <>
      <div className="w-096 mt-5 relative divEstatico">
        <div className="absolute divPermanente">
          <div className="p-8 table-cell align-middle">
            <div className="flex justify-center space-x-6">
              <span className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="white"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  props.clickFunction(props.data);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="white"
                  class="bi bi-arrows-fullscreen"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4 pl-6 pr-6">
            <div className="flex justify-center">
              <span className="text-lg font-bold">{props.data.name}</span>
            </div>
            <div className="flex justify-center">
              <span className="text-xs font-bold text-gray-500">{props.data.code}</span>
            </div>
          <div className="shadow w-full bg-grey-light rounded-xl mt-8">
            <div
              class="bg-blue-800 text-xs leading-none py-1 text-center font-bold rounded-xl"
              style={{
                width:
                  (props.data["totalDone"] * props.data["totalNum"]) / 100 +
                  "%",
              }}
            >
              <span className="ml-1">
                {(props.data["totalDone"] * props.data["totalNum"]) / 100}%
              </span>
            </div>
          </div>
          <div className="w-full grid grid-flow-col grid-cols-2 mt-8 ">
            <div className="flex justify-start">
              <div className="w-1/2 text-left">
                <span className="text-base font-bold uppercase ">
                  {props.data["inspType"] != null &&
                    props.data["inspType"].name +
                      "(" +
                      props.data["inspType"].values.length +
                      ")"}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-1/2 text-right mt-auto mb-auto">
                <span className="text-sm font-bold ml-4">
                  {props.data.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default cardRework;

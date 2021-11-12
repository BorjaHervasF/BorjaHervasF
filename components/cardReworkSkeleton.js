import React, { useEffect } from "react";

const cardReworkSkeleton = () => {
  return (
    <div className="w-full mt-5 pr-6">
      <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4 pl-6 pr-6">
        <div className="w-full grid grid-flow-col grid-cols-2 h-6">
          <div className="w-40 flex justify-start bg-gray-200 animate-pulse"></div>
          <div className="flex justify-end">
            <div className="w-24 h-6 mt-auto mb-auto bg-gray-200 animate-pulse"></div>
          </div>
        </div>
        <div class="shadow w-full h-6 rounded-xl mt-8 bg-gray-200 animate-pulse"></div>
        <div className="w-full grid grid-flow-col grid-cols-2 mt-8 ">
          <div className="flex justify-start w-24 h-6 mt-auto mb-auto bg-gray-200 animate-pulse"></div>
          <div className="flex justify-end">
            <div className="w-24 h-6 mt-auto mb-auto bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default cardReworkSkeleton;

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useState from "react-usestateref";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";

const PrintLoad = (props) => {
  var [screenshot, setScreenshot, screenshotRef] = useState(false);

  const download_ = () => {
    var doc = new jsPDF("l", "pt");

    var margin = {top: 10, right: 20, bottom: 10, left: 20};
    var pdf = doc.html(document.getElementById("download_"), {
        // Adjust your margins here (left, top, right ,bottom)
        callback: function (pdf) {
    pdf.save("ejemplo.pdf");
              }});


    setTimeout(() => {
      setScreenshot(false);
    }, 100);
    // html2canvas(document.getElementById('download_')).then(canvas => {
    //     var url_base64 = canvas.toDataURL("image/png")
    //     var doc = new jsPDF({
    //         unit: 'in',
    //         orientation: 'landscape',
    //         format: 'a4'
    //     });
    //     let imgProps= doc.getImageProperties(url_base64);
    //     let pdfWidth = doc.internal.pageSize.getWidth();
    //     let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //     doc.addImage(url_base64, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //     doc.save('download.pdf');

    //     console.log("Printed Load")

    //     setTimeout(() => {
    //         setScreenshot(false)
    //     }, 100);

    // });
  };

  return (
    <div
      id="download_"
      className="fixed left-0 top-0 bg-white w-850 py-1 px-4 overflow-auto fontSize"
    >
      <div className="border-2 border-gray-500 p-1 grid grid-cols-3">
        <div className="pl-2" id="download">
          <span>Ford España, SL</span> <br />
          <span>Almussafes - Valencia</span> <br />
          <span>46440 46440 - Almussafes</span>
        </div>

        <div className="flex justify-center items-start">
          <div className="flex items-center">
            <span className="font-medium text-lg">Loading List</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div>
            <div className="flex justify-center items-center">
              <span className="">Date: 17-11-2020</span>
            </div>

            <div className="flex justify-center items-center">
              <span className="">Operator: JESTREL9</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-500 pb-1 flex justify-start mt-2 ">
        <div className="w-full">
          <div className="flex justify-center">
            <span className="font-medium text-sm">
              CARRIER <span className="pl-4">INFORMATION</span>
            </span>
          </div>
          <div className="grid grid-cols-3 mt-1">
            <div className="flex justify-center mt-2">
              <div>
                <div>
                  <span className="font-medium">
                    <b>Carrier:</b>{" "}
                  </span>{" "}
                  Transportes Ferroviarios Espe
                </div>

                <div>
                  <span className="font-medium">
                    <b>Transport Mode:</b>{" "}
                  </span>{" "}
                  <span>Truck</span>
                </div>

                <div>
                  <span className="font-medium">
                    <b>Number of Vehicles:</b>{" "}
                  </span>{" "}
                  <span>8</span>
                </div>

                <div>
                  <div>
                    <span className="font-medium">
                      <b>Truck Driver:</b>{" "}
                    </span>{" "}
                    <span>339</span>
                  </div>

                  <div>
                    <span className="font-medium">
                      <b>License Plate:</b>{" "}
                    </span>{" "}
                    <span>9823CBB</span>
                  </div>
                  <div>
                    <span className="font-medium">
                      <b>Total Weight:</b>{" "}
                    </span>{" "}
                    <span>12057</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="justify-center flex items-center">
                <div className="space-y-2">
                  <div className="w-full justify-center flex items-center">
                    <span className="font-medium">Transport Number</span>
                  </div>

                  <div className="w-full flex justify-center  items-center">
                    <QRCode
                      renderAs={"jpg"}
                      value={"TRK11693405023546721"}
                      bgColor={"white"}
                      size={50}
                    />
                  </div>

                  <div
                    className="w-full justify-center flex items-center"
                    style={{ marginBottom: 2 + "px", marginTop: -2+"px" }}
                  >
                    <span className="textVin">TRK11693405023546721</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="justify-center flex items-center">
                <div className="space-y-2">
                  <div className="w-full justify-center flex items-center">
                    <span className="font-medium">Load ID</span>
                  </div>

                  <div className="w-full justify-center flex items-center">
                    <QRCode
                      renderAs={"jpg"}
                      value={"T.OUT18015227687341"}
                      bgColor={"white"}
                      size={50}
                    />
                  </div>

                  <div
                    className="w-full justify-center flex items-start"
                    style={{ marginBottom: 2 + "px", marginTop: -2+"px" }}
                  >
                    <span className="textVin">T.OUT18015227687341</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* VINS */}
      <div className="grid grid-cols-2 mt-2 ">
        {/* VIN */}
        <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
      {/* VIN */}
      <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
      {/* VIN */}
      <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
      {/* VIN */}
      <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
              {/* VIN */}
              <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
         {/* VIN */}
         <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
         {/* VIN */}
         <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>
                      {/* VIN */}
                      <div className="w-full border-2 border-gray-500 flex">
          <div className="border-r-2 border-gray-500 w-2/3 p-2">
            <div className="w-full  mb-2">
              <span className="font-medium underline">Delivery to</span>
            </div>

            <div className="w-full">
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Market Code:</b></span>{" "}
                  <span>UB_M</span>
                </div>

                <div className="w-1/2">
                  <span className="font-medium"><b>Market:</b></span>{" "}
                  <span>BRITAIN</span>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/2">
                  <span className="font-medium"><b>Dealer Code:</b></span>{" "}
                  <span>41139 (GM)</span>
                </div>
                <div className="w-1/2">
                <span className="font-medium"><b>Destination:</b></span>{" "}
                <span>Herts</span>
              </div>
              </div>
              <div className="flex text-center">
              <div className="w-1/2">
                <span className="font-medium"><b>Dealer Name:</b></span>{" "}
                <span>Puerto De Valencia</span>
              </div>
              <div className="w-1/2">
                  <span className="font-medium"><b>Destination location:</b></span>{" "}
                  <span>GM_D</span>
                </div>
                </div>
            </div>

            <div className="w-full flex">
              <span className="font-medium mr-1"><b>Address: </b> </span>{" "}
              <span>
                Puerto de Valencia, Terminal europa Dique Este S/N 46024,
                Valencia
              </span>
            </div>
          </div>

          <div className="w-1/3 justify-center flex items-center p-2">
            <div>
              <div className="w-full justify-center flex items-center">
                <QRCode
                  renderAs={"jpg"}
                  value={"12345678LAKSJAH17"}
                  bgColor={"white"}
                  size={50}
                />
              </div>
              <div className="w-full justify-start flex items-center">
                <span className="textVin">
                  12345678LAKSJAH17
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
      {!screenshotRef.current && (
        <button
          onClick={() => {
            setScreenshot(true);
            setTimeout(() => {
              download_();
            }, 100);
          }}
        >
          download
        </button>
      )}
    </div>
  );
};

export default PrintLoad;

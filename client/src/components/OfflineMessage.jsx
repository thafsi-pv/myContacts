import React from "react";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

function OfflineMessage() {
  const reloadButton = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center !h-screen align-middle bg-white">
      <div className="bg-gray-200 shadow-xl p-6 rounded-md text-gray-700 flex flex-col justify-center items-center m-4">
        <MdSignalWifiConnectedNoInternet0 className="w-20 h-20 text-red-500" />
        <p className="font-semibold">No connection</p>
        <p className="text-xs text-gray-500">
          Check your internet connection, and try again!
        </p>
        <div className="mt-20">
          <a
            href="#"
            onClick={reloadButton}
            className="text-red-500 font-semibold">
            TRY AGAIN
          </a>
        </div>
      </div>
    </div>
  );
}

export default OfflineMessage;

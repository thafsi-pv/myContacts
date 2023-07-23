import React, { useEffect, useState } from "react";

function useLoader(initial) {
  const [isLoading, setIsLoading] = useState(initial);

  const toggleLoading = (val) => {
    setIsLoading(val);
  };

  const loader = (
    <div className="absolute top-0 left-0 right-0 overflow-clip z-50 flex justify-center items-center h-full w-screen bg-gray-200 bg-opacity-50">
      <span className="loading loading-dots loading-lg text-[#00BFA6]"></span>
    </div>
  );

  return { isLoading, toggleLoading, loader };
}

export default useLoader;

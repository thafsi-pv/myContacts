import React, { useState, useEffect } from "react";
import OfflineMessage from "../components/OfflineMessage";

const InternetConnection = (props) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (isOnline) {
    return <div>{props.children}</div>;
  } else {
    return <OfflineMessage />;
  }
};

export default InternetConnection;

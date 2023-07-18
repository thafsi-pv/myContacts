import React, { useEffect } from "react";
import "../style/fullScreenComponent.css";

const FullscreenComponent = ({ children }) => {
  // useEffect(() => {
  //     const openFullscreen = () => {
  //       const element = document.documentElement; // Change to your desired element
  //       if (element.requestFullscreen) {
  //         element.requestFullscreen();
  //       } else if (element.mozRequestFullScreen) {
  //         element.mozRequestFullScreen();
  //       } else if (element.webkitRequestFullscreen) {
  //         element.webkitRequestFullscreen();
  //       } else if (element.msRequestFullscreen) {
  //         element.msRequestFullscreen();
  //       }
  //     };

  //     const isMobile = window.matchMedia('(max-width: 768px)').matches;
  //     if (isMobile) {
  //       openFullscreen();
  //     }
  //   }, []);

  //return <>{children}</>;
  return <div className="full-screen-container">{children}</div>;
};

export default FullscreenComponent;

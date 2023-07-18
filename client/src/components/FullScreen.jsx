import React, { useEffect } from 'react';

const FullscreenComponent = ({ children }) => {
  useEffect(() => {
    const openFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };

    openFullscreen();
  }, []);

  return <>{children}</>;
};

export default FullscreenComponent;
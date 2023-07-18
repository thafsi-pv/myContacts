import { createContext, useState } from "react";

export const DrawerContext = createContext();

const DrawerHandleContext = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <DrawerContext.Provider value={{ showDrawer, toggleDrawer }}>
      {props.children}
    </DrawerContext.Provider>
  );
};

export default DrawerHandleContext;

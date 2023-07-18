import { createContext, useState } from "react";

const DrawerContext = createContext();

const DrawerHandle = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrwer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <DrawerContext.Provider value={{ showDrawer, toggleDrwer }}>
      {props.children}
    </DrawerContext.Provider>
  );
};

export default DrawerHandle;

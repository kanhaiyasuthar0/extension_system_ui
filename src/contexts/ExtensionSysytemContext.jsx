import { createContext, useContext, useState } from "react";

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
function MyContextProvider({ children }) {
  // Define the state or data you want to share
  const [allValues, setAllValues] = useState({});

  // Define functions or methods to update the state

  // Create a context value object containing the state and methods
  const contextValue = {
    allValues,
    setAllValues,
  };

  // Provide the context value to the components in the tree
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

// Step 3: Create a custom hook to access the context
function useMyContext() {
  return useContext(MyContext);
}

export { MyContextProvider, useMyContext };

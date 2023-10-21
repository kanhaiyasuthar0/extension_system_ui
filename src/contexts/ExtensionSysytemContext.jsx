import { createContext, useContext, useState } from "react";

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
function MyContextProvider({ children }) {
  const [db, setDb] = useState([]);

  // Define the state or data you want to share
  const [allValues, setAllValues] = useState({});
  const [audio, setAudio] = useState({
    isRecording: false,
    audioBlob: null,
  });
  
  // Define functions or methods to update the state

  // Create a context value object containing the state and methods
  const contextValue = {
    allValues,
    setAllValues,
    audio,
    setAudio,
    db,
    setDb,
  };

  // Provide the context value to the components in the tree`
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

// Step 3: Create a custom hook to access the context
function useMyContext() {
  return useContext(MyContext);
}

export { MyContextProvider, useMyContext };

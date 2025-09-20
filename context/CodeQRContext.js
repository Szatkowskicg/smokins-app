import { createContext, useState, useContext } from "react";

const CodeQRContext = createContext();
export const useCodeQRContext = () => useContext(CodeQRContext);

const CodeQRProvider = ({ children }) => {
  const [scannedData, setScannedData] = useState(null);

  return (
    <CodeQRContext.Provider value={{ scannedData, setScannedData }}>
      {children}
    </CodeQRContext.Provider>
  );
};

export default CodeQRProvider;

import { createContext, useState, useContext } from "react";

const CouponsContext = createContext();
export const useCouponsContext = () => useContext(CouponsContext);

const CouponsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [documentId, setDocumentId] = useState(null);
  const [accountId, setAccountId] = useState(null);

  const updateUserData = (userData) => {
    setPoints(userData?.points || 0);
    setDocumentId(userData?.$id || null);
    setAccountId(userData?.accountId || null);
  };

  return (
    <CouponsContext.Provider
      value={{
        points,
        setPoints,
        documentId,
        setDocumentId,
        accountId,
        setAccountId,
        updateUserData,
      }}
    >
      {children}
    </CouponsContext.Provider>
  );
};

export default CouponsProvider;

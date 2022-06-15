// import
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [metamaskPresent, setMetamaskPresent] = useState(true);
  const [allTokens, setAllTokens] = useState();

  let sharedState = {
    connected,
    setConnected,
    account,
    setAccount,
    network,
    setNetwork,
    metamaskPresent,
    setMetamaskPresent,
    allTokens,
    setAllTokens,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

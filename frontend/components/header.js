/** @jsxImportSource @compiled/react */
import { useEffect } from "react";
import useConnectWallet from "../utils/connectWallet";
import { useAppContext } from "../context/state";

export default function Header() {
  const { connected, account, setAccount, setConnected } = useAppContext();
  const { handleAccountChanged, handleChainChanged, eagerConnect } =
    useConnectWallet();
  const connectWallet = async () => {
    if (!!window.ethereum || !!window.web3) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      eagerConnect();
    } else {
      alert("please use an etherum enabled browser");
    }
  };
  useEffect(() => {
    if (!window.ethereum) return;
    const localAccount = localStorage.getItem("myAddress");
    if (localAccount) {
      setAccount(localAccount);
      setConnected(true);
    }
    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("accountsChanged", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
  }, [eagerConnect, handleAccountChanged, handleChainChanged]);
  return (
    <div>
      <button onClick={connectWallet}>connect</button>
      <div css={{ color: "white" }}>{connected ? "Yes" : "no"}</div>
      <div css={{ color: "white" }}>{account}</div>
    </div>
  );
}

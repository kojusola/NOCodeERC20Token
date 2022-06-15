import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useAppContext } from "../../context/state";
import { toast } from "react-toastify";

// const { setConnected, setAccount } = useAppContext();

export default function useConnectWallet() {
  const { setConnected, setAccount } = useAppContext();

  const handleAccountChanged = useCallback(async (accounts) => {
    if (!!accounts.length) {
      const networkId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (Number(networkId) !== 80001) return;
      setConnected(true);
      setAccount(accounts[0]);
      localStorage.setItem("myAddress", accounts[0]);
      // toast.success("Connected to wallet");
    } else {
      setConnected(false);
      setAccount("");
      localStorage.removeItem("myAddress");
      toast.error("No account found");
    }
  }, []);

  const handleChainChanged = useCallback(async (chainid) => {
    if (Number(chainid) !== 80001) {
      setConnected(false);
      setAccount("");
      localStorage.removeItem("myAddress");
      toast.error(
        "You are connected to the wrong network, please switch to polygon mumbai"
      );
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (!accounts.length) return;
      setAccount(accounts[0]);
      localStorage.setItem("myAddress", accounts[0]);
      setConnected(true);
    }
  }, []);

  const eagerConnect = useCallback(async () => {
    const networkId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (Number(networkId) !== 80001) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (!accounts.length) return;
    setAccount(accounts[0]);
    localStorage.setItem("myAddress", accounts[0]);
    setConnected(true);
    toast.success("Connected to wallet");
  }, []);

  const connectWallet = async () => {
    if (!!window.ethereum || !!window.web3) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      eagerConnect();
    } else {
      alert("please use an etherum enabled browser");
    }
  };
  const disConnectWallet = async () => {
    setConnected(false);
    setAccount("");
    localStorage.removeItem("myAddress");
    toast.error("Disconnected from wallet");
  };
  return {
    handleAccountChanged,
    handleChainChanged,
    eagerConnect,
    disConnectWallet,
    connectWallet,
  };
}

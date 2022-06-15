import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../context/state";
import { ethers, utils, Contract } from "ethers";
import { CONTRACT_ADDRESS, abi, minTokenABI } from "./constants";
import { toast } from "react-toastify";

// const { setConnected, setAccount } = useAppContext();

export default function useTokens() {
  const { setAllTokens, account } = useAppContext();
  const createTokens = async (name, symbol, totalSupply) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ERC20FactoryInstance = new Contract(CONTRACT_ADDRESS, abi, signer);
      const token = await ERC20FactoryInstance.createToken(
        name,
        symbol,
        "18",
        totalSupply
      );
      if (token) {
        return toast.success("Token created successfully");
      }
    } catch (err) {
      toast.error("Error creating token");
    }
  };
  const getAllTokens = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ERC20FactoryInstance = new Contract(CONTRACT_ADDRESS, abi, signer);
      const allTokens = await ERC20FactoryInstance.getAll();
      // console.log(allTokens);
      setAllTokens(allTokens);
      if (!!allTokens) {
        return toast.success("Tokens fetched successfully");
      }
    } catch (err) {
      toast.error("Error fetching tokens");
    }
  };

  const transferTokens = async (to, amount, tokenAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const TokenInstance = new Contract(tokenAddress, minTokenABI, signer);
      const tokenBalance = await TokenInstance.balanceOf(account);
      const weiValue = utils.parseEther(amount.toString());
      if (tokenBalance.toString() < weiValue.toString()) {
        return toast.error("Insufficient balance");
      }
      const tokensTransfer = await TokenInstance.transfer(to, weiValue);
      if (tokensTransfer) {
        return toast.success("Tokens transferred successfully");
      }
    } catch (err) {
      toast.error("Error transferring tokens");
    }
  };

  return {
    createTokens,
    getAllTokens,
    transferTokens,
  };
}

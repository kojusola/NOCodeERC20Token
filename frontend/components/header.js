/** @jsxImportSource @compiled/react */
import { useEffect } from "react";
import Link from "next/link";
import useConnectWallet from "../utils/web3/connectWallet";
import { useAppContext } from "../context/state";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CollectionSVG from "../images/collection.svg";

export default function Header() {
  const { connected, setMetamaskPresent } = useAppContext();
  const {
    handleAccountChanged,
    handleChainChanged,
    eagerConnect,
    disConnectWallet,
    connectWallet,
  } = useConnectWallet();

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskPresent(false);
      return;
    }
    const localAccount = localStorage.getItem("myAddress");
    if (localAccount) {
      eagerConnect();
    }
    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("accountsChanged", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
  }, [eagerConnect, handleAccountChanged, handleChainChanged]);

  return (
    <div css={{ width: "100%" }}>
      <ToastContainer />
      <div
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <a>
            <p
              css={{
                fontFamily: "VPPixel-Simplified",
                fontSize: "30px",
                lineHeight: "35px",
                color: "#FFFFFF",
                margin: "0",
                "@media (max-width: 520px)": {
                  fontSize: "16px",
                  lineHeight: "22px",
                },
              }}
            >
              NoCodeERC20
            </p>
          </a>
        </Link>
        <div css={{ display: "flex", alignItems: "center" }}>
          <Link href="/tokens" passHref>
            <a>
              <CollectionSVG
                css={{
                  marginRight: "20px",
                  width: "40px",
                  height: "40px",
                  color: "white",
                  "&:hover": { color: "#866eff", cursor: "pointer" },
                  "@media (max-width: 520px)": {
                    width: "20px",
                    height: "20px",
                  },
                }}
              />
            </a>
          </Link>
          {connected ? (
            <button
              onClick={disConnectWallet}
              css={{
                fontSize: "18px",
                lineHeight: "22px",
                flexShrink: "0",
                color: "#fff",
                padding: "10px 40px",
                backgroundColor: "#917EFF",
                height: "60px",
                borderRadius: "10px",
                border: "1px solid #866eff",
                "@media (max-width: 520px)": {
                  fontSize: "14px",
                  lineHeight: "18px",
                  height: "40px",
                  padding: "10px 20px",
                },
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  cursor: "pointer",
                  border: "1px solid #866eff",
                  color: "#917EFF",
                },
              }}
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={connectWallet}
              css={{
                fontSize: "18px",
                lineHeight: "22px",
                color: "#fff",
                padding: "10px 40px",
                backgroundColor: "#917EFF",
                height: "60px",
                borderRadius: "10px",
                flexShrink: "0",
                border: "none",
                "@media (max-width: 520px)": {
                  fontSize: "14px",
                  lineHeight: "18px",
                  height: "40px",
                  padding: "10px 20px",
                },
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  cursor: "pointer",
                  border: "1px solid #866eff",
                  color: "#917EFF",
                },
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** @jsxImportSource @compiled/react */
import { useState, useEffect } from "react";
import useConnectWallet from "../utils/web3/connectWallet";
import { useAppContext } from "../context/state";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CollectionSVG from "../images/collection.svg";
import { addressShortner } from "../utils/helper";
import TokenTransfer from "./transferToken";
import { Circles } from "react-loader-spinner";
import useTokens from "../utils/web3/tokens";

export default function TokenList() {
  const [loading, setLoading] = useState(false);

  const { connected, allTokens } = useAppContext();
  const { getAllTokens } = useTokens();

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await getAllTokens();
      setLoading(false);
    };
    getAllData();
  }, []);

  return (
    <div css={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
      {connected ? (
        <div>
          <p
            css={{
              fontFamily: "VPPixel-Simplified",
              fontSize: "50px",
              lineHeight: "55px",
              color: "#FFFFFF",
              margin: "0",
              textAlign: "center",
              "@media (max-width: 500px)": {
                fontSize: "25px",
                lineHeight: "35px",
              },
            }}
          >
            TOKENS
          </p>

          {allTokens?.length > 0 ? (
            <div css={{ width: "100%" }}>
              <div
                css={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <div
                  css={{
                    width: "100%",
                    maxWidth: "30%",
                    fontSize: "25px",
                    lineHeight: "35px",
                    color: "#FFFFFF",
                    "@media (max-width: 800px)": {
                      fontSize: "16px",
                      lineHeight: "18px",
                    },
                  }}
                >
                  Token Name
                </div>
                <div
                  css={{
                    width: "100%",
                    maxWidth: "30%",
                    fontSize: "25px",
                    lineHeight: "35px",
                    color: "#FFFFFF",
                    "@media (max-width: 800px)": {
                      fontSize: "16px",
                      lineHeight: "18px",
                    },
                    "@media (max-width: 630px)": {
                      display: "none",
                    },
                  }}
                >
                  Token Address
                </div>
                <div
                  css={{
                    width: "100%",
                    maxWidth: "30%",
                  }}
                ></div>
              </div>
              {allTokens.map((data, index) => {
                console.log(data);
                return (
                  <div
                    key={data.name}
                    css={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      css={{
                        width: "100%",
                        maxWidth: "30%",
                        fontSize: "25px",
                        lineHeight: "35px",
                        color: "#FFFFFF",
                        "@media (max-width: 800px)": {
                          fontSize: "16px",
                          lineHeight: "18px",
                        },
                      }}
                    >
                      {data.name}
                    </div>
                    <div
                      css={{
                        width: "100%",
                        maxWidth: "33%",
                        fontSize: "25px",
                        lineHeight: "35px",
                        color: "#FFFFFF",
                        "@media (max-width: 800px)": {
                          fontSize: "16px",
                          lineHeight: "18px",
                        },
                        "@media (max-width: 630px)": {
                          display: "none",
                        },
                      }}
                    >
                      {addressShortner(data.tokenAddress)}
                    </div>
                    <div
                      css={{
                        width: "100%",
                        maxWidth: "30%",
                        display: "flex",
                        justifyContent: "flex-end",
                        "@media (max-width: 630px)": {
                          maxWidth: "64%",
                        },
                      }}
                    >
                      <TokenTransfer
                        tokenName={data.Name}
                        tokenAddress={data.tokenAddress}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p
              css={{
                fontFamily: "VPPixel-Simplified",
                fontSize: "50px",
                lineHeight: "55px",
                color: "#FFFFFF",
                margin: "0",
                marginTop: "50px",
                textAlign: "center",
                "@media (max-width: 500px)": {
                  fontSize: "25px",
                  lineHeight: "35px",
                },
              }}
            >
              No Tokens Found
            </p>
          )}
        </div>
      ) : (
        <div
          css={{
            paddingTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            css={{
              fontFamily: "VPPixel-Simplified",
              fontSize: "40px",
              lineHeight: "52px",
              color: "#FFFFFF",
              margin: "0",
              "@media (max-width: 500px)": {
                fontSize: "16px",
                lineHeight: "22px",
              },
            }}
          >
            Please Connect to the Mumbai Network
          </p>
        </div>
      )}
      <div
        css={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: "0.5",
          position: "absolute",
          top: "0",
          right: "0",
          display: loading ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Circles color="#917EFF" height={80} width={80} />
      </div>
    </div>
  );
}

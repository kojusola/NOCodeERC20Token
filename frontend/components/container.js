/** @jsxImportSource @compiled/react */
import { useEffect } from "react";
import { useAppContext } from "../context/state";
import ConnectedBody from "./connectedBody";

export default function Container() {
  const { connected, metamaskPresent } = useAppContext();
  return (
    <div css={{ width: "100%" }}>
      {!metamaskPresent && (
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
            Please Install the metamask Browser Extension and Try again
          </p>
        </div>
      )}
      {!connected && (
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
      {connected && (
        <div
          css={{
            paddingTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ConnectedBody />
        </div>
      )}
    </div>
  );
}

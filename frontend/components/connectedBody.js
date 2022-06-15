/** @jsxImportSource @compiled/react */
import { useEffect } from "react";
import { useAppContext } from "../context/state";
import CreateTokens from "./createToken";

export default function ConnectedBody() {
  return (
    <div css={{ width: "100%", color: "#FFFFFF" }}>
      <CreateTokens />
    </div>
  );
}

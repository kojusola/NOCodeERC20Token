/** @jsxImportSource @compiled/react */
import { useState } from "react";
import { useAppContext } from "../context/state";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useTokens from "../utils/web3/tokens";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function CreateTokens() {
  const [loading, setLoading] = useState(false);

  const { connected, account, setAccount, setConnected, metamaskPresent } =
    useAppContext();
  const { createTokens } = useTokens();

  // form validation rules
  const validationSchema = Yup.object().shape({
    tokenName: Yup.string().required("Token Name is required"),
    tokenSymbol: Yup.string().required("Token Symbol is required"),
    totalSupply: Yup.number().required("Total Supply is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    setLoading(true);
    createTokens(data.tokenName, data.tokenSymbol, data.totalSupply);
    setLoading(false);
    return false;
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={{
          maxWidth: "1100px",
          width: "100%",
          margin: "auto",
          paddingBottom: "50px",
          fontSize: "36px",
          lineHeight: "49px",
          fontWeight: "700",
        }}
      >
        <div css={{ width: "100%" }}>
          <label
            css={{
              fontSize: "24px",
              lineHeight: "29px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Token Name*
          </label>
          <input
            name="tokenName"
            {...register("tokenName")}
            css={{
              backgroundColor: "transparent",
              height: "60px",
              width: "100%",
              borderColor: "white",
              color: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          ></input>
          <div
            css={{
              color: "red",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {errors.tokenName?.message}
          </div>
        </div>
        <div css={{ width: "100%", marginTop: "30px" }}>
          <label
            css={{
              fontSize: "24px",
              lineHeight: "29px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Token Symbol*
          </label>
          <input
            name="tokenSymbol"
            {...register("tokenSymbol")}
            css={{
              backgroundColor: "transparent",
              height: "60px",
              width: "100%",
              borderColor: "white",
              color: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          ></input>
          <div
            css={{
              color: "red",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {errors.tokenSymbol?.message}
          </div>
        </div>
        <div css={{ width: "100%", marginTop: "30px" }}>
          <label
            css={{
              fontSize: "24px",
              lineHeight: "29px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Total Supply*
          </label>
          <input
            name="totalSupply"
            {...register("totalSupply")}
            css={{
              backgroundColor: "transparent",
              height: "60px",
              width: "100%",
              borderColor: "white",
              color: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "16px",
              lineHeight: "22px",
            }}
            type="number"
          ></input>
          <div
            css={{
              color: "red",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {errors.totalSupply?.message}
          </div>
        </div>
        <div
          css={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "flex-end",
          }}
        >
          <button
            css={{
              fontSize: "18px",
              lineHeight: "22px",
              color: "#fff",
              padding: "16px 53px",
              backgroundColor: "#917EFF",
              height: "60px",
              borderRadius: "10px",
              border: "none",
              "@media (max-width: 500px)": {
                fontSize: "14px",
                lineHeight: "18px",
                height: "40px",
                padding: "10px 20px",
              },
              transition: "all 0.3s",
              "&:hover": { backgroundColor: "#866eff", cursor: "pointer" },
            }}
          >
            Create Token
          </button>
        </div>
      </form>
      <div
        css={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: "0.5",
          position: "absolute",
          top: "0",
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

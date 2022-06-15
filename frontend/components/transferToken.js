/** @jsxImportSource @compiled/react */
import { useEffect, useState } from "react";
import useConnectWallet from "../utils/web3/connectWallet";
import { useAppContext } from "../context/state";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CollectionSVG from "../images/collection.svg";
import { addressShortner } from "../utils/helper";
import CancelSVG from "../images/cancel.svg";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalCloseButton,
} from "./radix-dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Circles } from "react-loader-spinner";
import useTokens from "../utils/web3/tokens";
import { useRouter } from "next/router";

export default function TokenTransfer({ tokenName, tokenAddress }) {
  const [loading, setLoading] = useState(false);
  const { transferTokens } = useTokens();
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address To transfer is required"),
    amount: Yup.number().required("Amount To Transfer is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    if (!ethers.utils.isAddress(data.address)) {
      return toast.error("Invalid Ethereum Address");
    }
    setLoading(true);
    await transferTokens(data.address, data.amount, tokenAddress);
    setLoading(false);
    router.reload(window.location.pathname);
    return false;
  };

  return (
    <div css={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <Modal Modal>
        <ModalTrigger
          css={{
            backgroundColor: "#000000",
            border: "none",
          }}
        >
          <button
            css={{
              fontSize: "16px",
              lineHeight: "18px",
              color: "#fff",
              padding: "10px 20px",
              backgroundColor: "#917EFF",
              height: "40px",
              borderRadius: "5px",
              flexShrink: "0",
              border: "none",
              "@media (max-width: 500px)": {
                fontSize: "14px",
                lineHeight: "16px",
                height: "50px",
                padding: "10px 10px",
              },
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#866eff",
                cursor: "pointer",
              },
            }}
          >
            Transfer Token
          </button>
        </ModalTrigger>

        <ModalContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            css={{ width: "100%", justifyContent: "center" }}
          >
            <p
              css={{
                fontSize: "30px",
                lineHeight: "40px",
                fontWeight: "700",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Transfer {tokenName}
            </p>
            <div css={{ width: "100%", marginTop: "30px" }}>
              <label
                css={{
                  fontSize: "24px",
                  lineHeight: "29px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Address To Transfer*
              </label>
              <input
                name="address"
                {...register("address")}
                css={{
                  backgroundColor: "transparent",
                  height: "60px",
                  width: "100%",
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
                {errors.address?.message}
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
                Amount To Transfer*
              </label>
              <input
                name="amount"
                {...register("amount")}
                css={{
                  backgroundColor: "transparent",
                  height: "60px",
                  width: "100%",
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
                {errors.amount?.message}
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
                Transfer Token
              </button>
            </div>
          </form>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
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

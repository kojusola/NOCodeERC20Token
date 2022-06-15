/** @jsxImportSource @compiled/react */
import React from "react";
import { keyframes } from "@compiled/react";
import CancelSVG from "../images/cancel.svg";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  DialogCloseProps,
  DialogContentImplProps,
} from "@radix-ui/react-dialog";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const overlayHide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translateY(10%)" },
  "20%": { opacity: 0, transform: "translateY(10%)" },
  "100%": { opacity: 1, transform: "translateY(0%)" },
});

const contentHide = keyframes({
  "0%": { opacity: 0, transform: "translateY(0%)" },
  "80%": { opacity: 0, transform: "translateY(10%)" },
  "100%": { opacity: 0, transform: "translateY(10%)" },
});

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

/*This component houses the modal content */

export const ModalContent = (props) => {
  return (
    <DialogPrimitive.Portal forceMount>
      <DialogPrimitive.Overlay
        css={{
          backgroundColor: "#0009",
          position: "fixed",
          zIndex: 20,
          inset: 0,
          overflowY: "auto",
          display: "grid",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          "&[data-state='open']": {
            animation: `${overlayShow} 250ms forwards`,
          },
          "&[data-state='closed']": {
            animation: `${overlayHide} 350ms forwards`,
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none!important",
          },
        }}
      >
        <DialogPrimitive.Content
          css={{
            backgroundColor: "white",
            borderRadius: 6,
            zIndex: 20,
            boxShadow:
              "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
            width: "90vw",
            maxWidth: "800px",
            // maxHeight: "85vh",
            padding: 25,
            paddingBottom: 50,
            "&[data-state='open']": {
              animation: `${contentShow} 360ms forwards`,
            },
            "&[data-state='closed']": {
              animation: `${contentHide} 250ms forwards`,
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none!important",
            },
            "&:focus": { outline: "none" },
          }}
          {...props}
        />
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
};

/* this component closes the modal */

export const ModalCloseButton = (props) => {
  return (
    <DialogPrimitive.Close
      className={props.className}
      css={{
        position: "absolute",
        fontFamily: "inherit",
        borderRadius: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        top: 10,
        right: 10,
        transition: "0.2s",
        height: 35,
        width: 35,
        color: "#917EFF",
        border: "none",
        backgroundColor: "#FFFFFF",
        "&:hover": { color: "#866eff" },
        "&:focus": { boxShadow: `0 0 0 2px #0001` },
      }}
      {...props}
    >
      <CancelSVG css={{ height: 30, width: 30 }} />
    </DialogPrimitive.Close>
  );
};

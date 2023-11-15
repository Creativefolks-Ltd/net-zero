import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  children: ReactElement;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen?: boolean;
}

export default function Modal({ isOpen, children }: Props) {
  if (typeof document === "undefined") return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="menu-modal"
              className="fixed inset-0 z-[999] flex items-center justify-center"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

"use client";
import React, { useState } from "react";
import { BsCheckLg, BsArrowRight, BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbClockExclamation } from "react-icons/tb";
interface Props {
  submitted?: boolean;
}

export default function SavedFormDrawer({ submitted }: Props) {
  const [open, setOpen] = useState(false as boolean);
  return (
    <div>
      <div
        className={`rounded  px-4 p-2 flex justify-between items-center cursor-pointer ${
          submitted ? "bg-brand-lighter" : "bg-error-light"
        }`}
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}
      >
        <div className="text-lg font-semibold">1. Latest form</div>
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key={"0"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AiOutlineClose className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key={"1"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BsChevronDown className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={` flex justify-between ${
              submitted ? "bg-brand-lightest" : "bg-error-lighter"
            }`}
            initial={{ opacity: 0, height: 0, padding: 0 }}
            animate={{ opacity: 1, height: 90, padding: "1rem 2rem" }}
            exit={{ opacity: 0, height: 0, padding: 0 }}
          >
            <div className="">
              <div className="flex gap-2 group cursor-pointer">
                {submitted ? (
                  <>
                    <div className=" text-brand mb-2 font-light group-hover:underline text-lg">
                      Form submitted
                    </div>
                    <BsCheckLg className="text-brand h-6 w-6 " />
                  </>
                ) : (
                  <>
                    <div className="text-orange mb-2 font-light group-hover:underline text-lg">
                      Form pending
                    </div>
                    <TbClockExclamation className="text-orange h-7 w-7 " />
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <a className="group-hover:underline text-lg font-semibold">
                  View form
                </a>
                <BsArrowRight className="w-6 h-6" />
              </div>
            </div>
            <div className="flex gap-2">
              <FiUpload className="w-8 h-8 cursor-pointer" />
              <RiDeleteBinLine className="w-8 h-8 cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

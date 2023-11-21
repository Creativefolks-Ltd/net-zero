"use client";

import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import Image from "next/image";
import React from "react";
import SubmissionsTable from "./SubmissionsTable";
import MobileSubmissions from "./MobileSubmissions";
import { FormProvider, useForm } from "react-hook-form";

export default function Submissions() {
  const methods = useForm({});

  return (
    <div
      className={`w-full mt-12 bg-grey-lighter pt-6 md:pt-12 pb-6 md:pb-24 px-6 md:px-12 rounded-lg`}
    >
      <div className="flex md:flex-row flex-col items-center justify-between">
        <div className="flex mb-12 md:mb-0">
          <figure className="w-8 h-8 relative">
            <Image src={"/images/Submissions.png"} alt="submissions" fill />
          </figure>
          <h2 className="ml-3 text-2xl font-light">Submissions</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Button secondary className="py-1 mb-2 md:mb-0">
            Create new user
          </Button>
          <Button secondary className="py-1">
            Upload CSV form
          </Button>
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mb-8">
          <h3 className="mb-3 mt-16 text-center md:text-left text-xl font-normal">
            Search submitted forms by user email address.
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:mr-10 w-full mb-5 md:mb-0">
              <Input placeholder="Enter user email address" name="email" />
            </div>
            <Button className="w-[100px] md:w-[unset] min-w-[130px]">
              Search
            </Button>
          </div>
        </form>
      </FormProvider>
      <SubmissionsTable />
      <MobileSubmissions />
    </div>
  );
}

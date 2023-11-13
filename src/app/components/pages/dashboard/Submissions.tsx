import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import Image from "next/image";
import React from "react";
import SubmissionsTable from "./SubmissionsTable";

export default function Submissions() {
  return (
    <div
      className={`w-full mt-12 bg-grey-lighter pt-6 md:pt-12 pb-6 md:pb-24 px-6 md:px-12 rounded-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <figure className="w-8 h-8 relative">
            <Image src={"/images/Submissions.png"} alt="submissions" fill />
          </figure>
          <h2 className="ml-3 text-2xl font-light">Submissions</h2>
        </div>
        <div className="flex gap-3">
          <Button secondary className="py-1">
            Create new user
          </Button>
          <Button secondary className="py-1">
            Upload CSV form
          </Button>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-3 mt-16 text-xl font-normal">
          Search submitted forms by user email address.
        </h3>
        <div className="flex justify-between">
          <div className="mr-10 w-full">
            <Input placeholder="Enter user email address" />
          </div>
          <Button className="min-w-[130px]">Search</Button>
        </div>
      </div>
      <SubmissionsTable />
    </div>
  );
}

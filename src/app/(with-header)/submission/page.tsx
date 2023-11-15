import Button from "@/components/core/Button";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

export default function SubmissionPage() {
  return (
    <section className="container pt-24 pb-48 px-12 lg:px-0">
      <div className="bg-grey-lighter px-12 md:px-24 py-12 md:py-24 rounded-xl">
        <div className="flex flex-col-reverse items-center md:items-start md:flex-row justify-between">
          <div className="font-bold text-4xl mt-5 md:mt-0">Form name</div>
          <Button secondary Icon={GoArrowLeft} className="max-w-[130px]">
            Back
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mt-12 md:mt-24">
          <div className="mb-12 md:mb-0 text-center md:text-left">
            <div className="mb-3">First name</div>
            <div className="mb-3">Last name</div>
            <div className="mb-3">Email address</div>
            <div>Calender year</div>
          </div>
          <div>
            <Button className="mb-4 w-full md:w-[250px] block">
              Download PDF
            </Button>
            <Button className="mb-4 w-full md:w-[250px] block" secondary>
              Assign to different user
            </Button>
            <Button className="w-full md:w-[250px] block" secondary>
              Delete form
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-12 h-[600px] text-4xl font-bold text-dark flex justify-center items-center border rounded-xl">
        Full Form
      </div>
      <Button secondary Icon={GoArrowLeft}>
        Back
      </Button>
    </section>
  );
}

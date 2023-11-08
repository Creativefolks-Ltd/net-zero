import React from "react";
import { RxAvatar } from "react-icons/rx";
import PersonalInformationForm from "./PersonalInformationForm";

export default function PersonalInformation() {
  return (
    <div className="w-1/2 bg-grey-lighter pt-12 pb-24 px-12 rounded-lg">
      <div className="flex items-center">
        <RxAvatar className="h-8 w-8" />
        <h2 className="ml-3 text-2xl font-light">Personal information</h2>
      </div>
      <PersonalInformationForm />
    </div>
  );
}

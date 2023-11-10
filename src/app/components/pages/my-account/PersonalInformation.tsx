import React from "react";
import { RxAvatar } from "react-icons/rx";
import PersonalInformationForm from "./PersonalInformationForm";

interface Props {
  halfWidthLayout?: boolean;
}

export default function PersonalInformation({ halfWidthLayout }: Props) {
  return (
    <div
      className={`w-full bg-grey-lighter pt-6 md:pt-12 pb-6 md:pb-24 px-6 md:px-12 rounded-lg`}
    >
      <div className="flex items-center">
        <RxAvatar className="h-8 w-8" />
        <h2 className="ml-3 text-2xl font-light">Personal information</h2>
      </div>
      <PersonalInformationForm halfWidthLayout={halfWidthLayout} />
    </div>
  );
}

import React from "react";
import Input from "../../core/Input";
import Button from "../../core/Button";

interface Props {
  halfWidthLayout?: boolean;
}

export default function PersonalInformationForm({ halfWidthLayout }: Props) {
  return (
    <form className={`mt-8`}>
      <div className={`${halfWidthLayout && "md:grid grid-cols-2 gap-5"}`}>
        <Input
          label="Your name"
          className="bg-white"
          placeholder="First name"
          wrapperClassname="mb-5"
        />
        <Input
          label="Last name"
          className="bg-white"
          placeholder="Last name"
          wrapperClassname="mb-5"
        />
        <Input
          label="Your email address"
          className="bg-white"
          placeholder="Your email address"
          wrapperClassname="mb-5"
        />
        <Input
          label="Password"
          className="bg-white"
          placeholder="*********"
          type="password"
          wrapperClassname="mb-5 md:mb-16 "
        />
      </div>
      <Button className="min-w-[130px] block m-auto md:m-[unset] mt-10">
        Save
      </Button>
    </form>
  );
}

"use client";

import React from "react";
import Input from "../../core/Input";
import Button from "../../core/Button";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  halfWidthLayout?: boolean;
}

export default function PersonalInformationForm({ halfWidthLayout }: Props) {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <form className={`mt-8`}>
        <div className={`${halfWidthLayout && "md:grid grid-cols-2 gap-5"}`}>
          <Input
            label="Your name"
            className="bg-white"
            placeholder="First name"
            wrapperClassname="mb-5"
            name="firstName"
          />
          <Input
            label="Last name"
            className="bg-white"
            placeholder="Last name"
            wrapperClassname="mb-5"
            name="lastName"
          />
          <Input
            label="Your email address"
            className="bg-white"
            placeholder="Your email address"
            wrapperClassname="mb-5"
            name="email"
          />
          <Input
            label="Password"
            className="bg-white"
            placeholder="*********"
            type="password"
            wrapperClassname="mb-5 md:mb-16 "
            name="password"
          />
        </div>
        <Button className="min-w-[130px] block m-auto md:m-[unset] mt-10">
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

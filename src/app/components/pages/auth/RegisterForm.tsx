"use client";

import React, { useState } from "react";
import { Heading } from "../../core/Heading";
import Button from "../../core/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../database.types";
import { RegisterAuthData } from "../../../../types/types";
import { supabaseClient } from "../../../../lib/supabase";
import Input from "@/components/core/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { schemaForType } from "../../../../types/validation";

const initialValue = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

const schema = schemaForType<RegisterAuthData>()(
  zod
    .object({
      firstName: zod.string().min(1, { message: "Please provide a name" }),
      lastName: zod.string().min(1, { message: "Please provide a name" }),
      email: zod.string().email({ message: "Please provide a valid email" }),
      password: zod
        .string()
        .min(6, { message: "Please provide a password" })
        .refine(
          (value) =>
            /^(?=.*[0-9])(?=.*[!_@#$%^&*])[a-zA-Z0-9!_@#$%^&*].{6,16}$/.test(
              value
            ),
          "Password should contain at least one number, one special character and should be between 6 and 16 characters long"
        ),
      confirmPassword: zod
        .string()
        .min(6, { message: "Please confirm the password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords didn't match",
      path: ["confirmPassword"],
    })
);

export default function RegisterForm() {
  // const [formData, setFormData] = useState(initialValue as RegisterAuthData);
  const [responseError, setResponseError] = useState("" as string);
  const [formSent, setFormSent] = useState(false as boolean);

  const methods = useForm<RegisterAuthData>({ resolver: zodResolver(schema) });

  const {
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const supabase = createClientComponentClient<Database>();

  const handleSignUp: SubmitHandler<RegisterAuthData> = async (formData) => {
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth`,
      },
    });
    if (error) {
      setResponseError(error.message);
      return;
    }
    if (data.user) {
      await supabaseClient.from("users").insert({
        email: getValues("email"),
        role: 2,
        first_name: getValues("firstName"),
        last_name: getValues("lastName"),
        id: data.user.id,
      });
    }
    setFormSent(true);
  };

  const resendConfirmationEmail = async () => {
    await supabase.auth.resend({
      type: "signup",
      email: getValues("email"),
      options: {
        emailRedirectTo: `${location.origin}/auth`,
      },
    });
  };

  if (formSent) {
    return (
      <div className="md:w-1/2 lg:w-1/4 ">
        <Heading
          level={1}
          withUnderline
          className="text-3xl text-brand-dark pb-4 mb-4 mt-10"
        >
          Confirm your email
        </Heading>
        <p>
          Please check your inbox for a confirmation email. Click the link in
          the email to confirm your email address.
        </p>
        <Button onClick={() => resendConfirmationEmail()}>
          Resend confirmation email
        </Button>
      </div>
    );
  }
  console.log(getValues("firstName"), "asdfds");
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="md:w-1/2 lg:w-1/4 text-start"
      >
        <Heading
          level={1}
          withUnderline
          className="text-3xl text-brand-dark pb-4 mb-4 mt-10"
        >
          Welcome
        </Heading>
        <span>Register to continue</span>
        <div className="text-sm text-error text-center mt-8 mb-5 h-14 flex items-center justify-center">
          {responseError}
        </div>
        <Input
          name="firstName"
          placeholder="First Name"
          wrapperClassname="mb-5"
          required
          errorMessage={errors.firstName?.message}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          wrapperClassname="mb-5"
          required
          errorMessage={errors.lastName?.message}
        />
        <Input
          name="email"
          placeholder="Email address"
          required
          wrapperClassname="mb-5"
          errorMessage={errors.email?.message}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          wrapperClassname="mb-5"
          required
          errorMessage={errors.password?.message}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          wrapperClassname=""
          required
          errorMessage={errors.confirmPassword?.message}
        />
        <div className="flex flex-col items-center mt-12">
          <Button
            loading={isSubmitting}
            htmlType="submit"
            className="min-w-[150px] mt-4 text-center"
          >
            Register
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

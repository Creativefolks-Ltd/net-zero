"use client";

import React, { useState } from "react";
import Input from "../../core/Input";
import { Heading } from "../../core/Heading";
import Button from "../../core/Button";
import { AuthData } from "../../../../types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../database.types";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { schemaForType } from "../../../../types/validation";

const schema = schemaForType<AuthData>()(
  zod.object({
    email: zod.string().email({ message: "Please provide a valid email" }),
    password: zod.string().min(6, { message: "Please enter a password" }),
  })
);

export default function SignInForm() {
  const [error, setError] = useState(" " as string);

  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const methods = useForm<AuthData>({ resolver: zodResolver(schema) });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<AuthData> = async (data) => {
    try {
      const { email, password } = data;
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (res.error) {
        setError(res.error.message);
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-1/2 lg:w-1/4 text-start"
      >
        <Heading
          level={1}
          withUnderline
          className="text-3xl text-brand-dark pb-4 mb-4 mt-10"
        >
          Welcome back
        </Heading>
        <span>Sign in to continue</span>
        <div className="text-sm text-error text-center mt-12 mb-3 h-8">
          {error}
        </div>
        <Input
          name="email"
          required
          placeholder="Email address"
          wrapperClassname="mb-5"
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder="Password"
          required
          type="password"
          name="password"
          errorMessage={errors.password?.message}
        />
        <div className="flex flex-col items-center mt-12">
          <a href="/forgot-password" className="underline">
            Forgot your password?
          </a>
          <Button
            htmlType="submit"
            className="min-w-[150px] mt-10 md:mt-4 text-center"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

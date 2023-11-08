import React from "react";
import PersonalInformation from "../components/pages/my-account/PersonalInformation";
import Header from "../components/core/Header";
import SavedForms from "../components/pages/my-account/SavedForms";

export default function MyAccount() {
  return (
    <>
      <Header />
      <main className="container px-12 pt-16 pb-36">
        <h1 className="font-bold text-brand-dark text-4xl md:text-5xl mb-8 md:mb-16">
          My account{" "}
        </h1>
        <div className="flex md:flex-row flex-col gap-12">
          <PersonalInformation />
          <SavedForms />
        </div>
      </main>
    </>
  );
}

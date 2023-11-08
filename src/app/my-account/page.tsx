import React from "react";
import PersonalInformation from "../components/pages/my-account/PersonalInformation";
import Header from "../components/core/Header";
import SavedForms from "../components/pages/my-account/SavedForms";

export default function MyAccount() {
  return (
    <>
      <Header />
      <main className="container pt-16 pb-36">
        <h1 className="font-bold text-brand-dark text-5xl mb-16">
          My account{" "}
        </h1>
        <div className="flex gap-12">
          <PersonalInformation />
          <SavedForms />
        </div>
      </main>
    </>
  );
}

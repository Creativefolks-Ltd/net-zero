import React from "react";
import PersonalInformation from "@/components/pages/my-account/PersonalInformation";
import Submissions from "@/components/pages/dashboard/Submissions";
import { withAuth } from "../../../withAuth";

function Dashboard() {
  return (
    <main className="container px-12 pt-16 pb-36">
      <h1 className="font-bold text-brand-dark text-4xl md:text-5xl mb-8 md:mb-16">
        Admin Dashboard{" "}
      </h1>
      <div className="flex md:flex-row flex-col gap-12">
        <PersonalInformation halfWidthLayout />
      </div>
      <Submissions />
    </main>
  );
}

export default withAuth(Dashboard);

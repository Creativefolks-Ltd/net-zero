import React from "react";
import MobileSubmissionRow from "./MobileSubmissionRow";

export default function MobileSubmissions() {
  return (
    <div className="md:hidden">
      <div className="px-5 py-2 text-xl bg-grey text-white rounded-tl-xl rounded-tr-xl">
        Results
      </div>
      <div className="result-rows">
        <MobileSubmissionRow />
        <MobileSubmissionRow />
        <MobileSubmissionRow />
        <MobileSubmissionRow />
        <MobileSubmissionRow />
      </div>
    </div>
  );
}

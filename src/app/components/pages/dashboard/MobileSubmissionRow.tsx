import Image from "next/image";
import React from "react";

export default function MobileSubmissionRow() {
  return (
    <div className="px-5 py-4">
      <p>My form name</p>
      <p className="text-ellipsis w-full overflow-hidden">
        myfullnameexample@emailaddress.com
      </p>
      <div className="flex justify-between items-center">
        <p className="mb-0">01/11/22</p>
        <div className="flex items-center">
          <p className="mb-0 mr-4">View form</p>
          <figure className="relative h-4 w-5">
            <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
          </figure>
        </div>
      </div>
    </div>
  );
}

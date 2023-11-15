import Image from "next/image";
import React from "react";

export default function SubmissionsTable() {
  return (
    <table className="w-full hidden md:table">
      <thead>
        <th>Form name</th>
        <th>User email address</th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
        <tr>
          <td>My form name</td>
          <td>myfullnameexample@emailaddress.co.uk</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              View form{" "}
              <figure className="h-4 w-6 relative">
                <Image src={"/images/arrow-right.png"} alt="arrow-right" fill />
              </figure>
              <figure className=" h-7 w-6 relative ml-5">
                <Image src={"/images/upload-icon.png"} alt="upload" fill />
              </figure>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

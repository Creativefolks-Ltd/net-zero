import React from "react";

export default function HomeSectionTwo() {
  return (
    <section className="section">
      <div className="container px-12 lg:px-8">
        <p className="uppercase text-lg lg:text-2xl mb-2">
          How to complete the form
        </p>
        <h3 className="text-3xl lg:text-5xl font-light lg:font-bold w-2/3">
          Form essentials
        </h3>

        <div className="py-16 lg:w-5/6">
          <p>
            The first step is to provide information through the tailored form,
            relating to your home, travel, shopping and assets. Information is
            encrypted and held on a secure server* and the form should take no
            more than 15 minutes to complete. On each page there are some
            sections that are required and others that are optional. The
            optional sections are for activities that we expect aren’t the
            biggest sources of emissions or which taken more time to complete.
            However, adding this information will give you a more accurate
            carbon footprint and more tailored recommendations.
          </p>

          <p>
            To make the process quicker and easier, gather the following details
            before starting:
          </p>

          <div className="grid grid-cols-4 lg:grid-cols-3 gap-8">
            <div className="p-8 col-span-4 lg:col-auto flex flex-col text-center items-center">
              <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
              <p>
                Your residential energy consumption (electricity, natural gas,
                heating oil, any others)
              </p>
            </div>
            <div className="p-8 col-span-2 lg:col-auto flex flex-col text-center items-center">
              <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
              <p>Your air travel use (number of flights/distance travelled)</p>
            </div>
            <div className="p-8 col-span-2 lg:col-auto flex flex-col text-center items-center">
              <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
              <p>
                Your road travel use (vehicle information/ distance travelled)
              </p>
            </div>
          </div>

          <p>
            You can save your responses if you are not able to complete the
            form, and return to it later. Once you have submitted the
            information, the net zero team will respond with initial results and
            suggested actions, and an invitation to arrange a consultation to
            discuss.
          </p>

          <p>
            The tool has been built by Good Business and is based on the
            principles of the Greenhouse Gas Protocol. It has been developed
            specifically for Anthos and gives family members a tailored and
            personal service, making it stand out from the many carbon
            calculators available online.
          </p>

          <div className="mt-16">
            <button className="bg-brand rounded-lg px-6 py-2 text-white font-bold text-lg">
              Calculate your footprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

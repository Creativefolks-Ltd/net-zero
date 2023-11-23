import React from "react";

export default function HomeSectionOne() {
  return (
    <section className="section bg-brand-light">
      <div className="container small px-12 lg:px-8">
        <p className="uppercase text-lg lg:text-2xl mb-2">
          The future of sustainability
        </p>
        <h3 className="text-3xl font-semibold lg:text-5xl lg:w-2/3">
          Your personal carbon footprint calculator
        </h3>
      </div>
      <div className="container px-12 lg:px-8 !max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-24 py-16">
          <div className="lg:col-span-5 w-full h-48 lg:h-auto bg-brand"></div>
          <div className="lg:col-span-7">
            <p>
              <strong>
                Understand the shape and size of your carbon footprint.
              </strong>
            </p>
            <p>
              <strong>
                Connect with an advisory service to discuss and explore
                opportunities for carbon reduction.
              </strong>
            </p>
            <p>Understand the shape and size of your carbon footprint.</p>
            <p>
              Select from a choice of carbon offsets to compensate for emissions
              and become carbon neutral.
            </p>
            <p>
              Repeat the process on an annual basis and track progress through
              time.
            </p>
            <div className="mt-16">
              <button className="bg-brand font-light rounded-lg px-6 py-2 text-white lg:font-bold text-lg">
                Calculate your footprint
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

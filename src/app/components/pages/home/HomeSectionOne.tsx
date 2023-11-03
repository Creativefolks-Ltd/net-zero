import React from "react";

export default function HomeSectionOne() {
  return (
    <section className="section bg-brand-light">
      <div className="container small">
        <p className="uppercase text-2xl mb-2">The future of sustainability</p>
        <h3 className="text-5xl w-2/3">Your personal carbon footprint calculator</h3>
      </div>
      <div className="container !max-w-6xl">
        <div className="grid grid-cols-12 gap-24 py-16">
          <div className="col-span-5 bg-brand"></div>
          <div className="col-span-7">
            <p>
              <strong>Understand the shape and size of your carbon footprint.</strong>
            </p>
            <p>
              <strong>Connect with an advisory service to discuss and explore opportunities for carbon reduction.</strong>
            </p>
            <p>Understand the shape and size of your carbon footprint.</p>
            <p>Select from a choice of carbon offsets to compensate for emissions and become carbon neutral.</p>
            <p>Repeat the process on an annual basis and track progress through time.</p>
            <div className="mt-16">
              <button className="bg-brand rounded-lg px-6 py-2 text-white font-bold text-lg">Calculate your footprint</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

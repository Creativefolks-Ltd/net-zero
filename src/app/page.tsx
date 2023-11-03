export default function Home() {
  return (
    <main>
      <header className="h-screen bg-black">
        <div className="container h-full flex items-center">
          <div className="w-1/2">
            <h1 className="text-7xl mb-12 font-bold text-white">The Anthos Net Zero project</h1>
            <h2 className="text-3xl font-bold text-white">Created to provide an ongoing service to help all family members</h2>
          </div>
        </div>
      </header>
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

      <section className="section">
        <div className="container">
          <p className="uppercase text-2xl mb-2">How to complete the form</p>
          <h3 className="text-5xl w-2/3">Form essentials</h3>

          <div className="py-16 w-5/6">
            <p>The first step is to provide information through the tailored form, relating to your home, travel, shopping and assets. Information is encrypted and held on a secure server* and the form should take no more than 15 minutes to complete. On each page there are some sections that are required and others that are optional. The optional sections are for activities that we expect aren’t the biggest sources of emissions or which taken more time to complete. However, adding this information will give you a more accurate carbon footprint and more tailored recommendations.</p>

            <p>To make the process quicker and easier, gather the following details before starting:</p>

            <div className="grid grid-cols-3 gap-8">
              <div className="p-8 flex flex-col text-center items-center">
                <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
                <p>Your residential energy consumption (electricity, natural gas, heating oil, any others)</p>
              </div>
              <div className="p-8 flex flex-col text-center items-center">
                <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
                <p>Your air travel use (number of flights/distance travelled)</p>
              </div>
              <div className="p-8 flex flex-col text-center items-center">
                <div className="border-2 border-brand rounded-full aspect-square w-32 h-32 mb-4"></div>
                <p>Your road travel use (vehicle information/ distance travelled)</p>
              </div>
            </div>

            <p>You can save your responses if you are not able to complete the form, and return to it later. Once you have submitted the information, the net zero team will respond with initial results and suggested actions, and an invitation to arrange a consultation to discuss.</p>

            <p>The tool has been built by Good Business and is based on the principles of the Greenhouse Gas Protocol. It has been developed specifically for Anthos and gives family members a tailored and personal service, making it stand out from the many carbon calculators available online.</p>

            <div className="mt-16">
              <button className="bg-brand rounded-lg px-6 py-2 text-white font-bold text-lg">Calculate your footprint</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-grey-light">
        <div className="container small">
          <h3 className="text-center text-5xl mb-16">Protecting your data</h3>
          <p className="text-center mb-16">All of your responses in this survey will be encrypted with TLS and only accessed by the Net-Zero team for the purposes of calculating your footprint and providing recommendations to reduce it. You can find more information in Good Business’ privacy policy here. The tool met the high data security requirements for penetration testing in March 2022.</p>

          <div className="grid grid-cols-2 gap-16">
            <div className="bg-black"></div>
            <div>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo.</p>

              <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor et accusam et dolores justo.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

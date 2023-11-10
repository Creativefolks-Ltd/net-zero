import Header from "../components/core/Header";
import HomeBanner from "../components/pages/home/HomeBanner";
import HomeSectionOne from "../components/pages/home/HomeSectionOne";
import HomeSectionThree from "../components/pages/home/HomeSectionThree";
import HomeSectionTwo from "../components/pages/home/HomeSectionTwo";

export default function Home() {
  return (
    <main>
      <HomeBanner>
        <Header isInBanner />
      </HomeBanner>
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
    </main>
  );
}

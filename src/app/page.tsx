import HeroSlider from "@/components/sections/HeroSlider";
import WhoWeAre from "@/components/sections/WhoWeAre";
import OurPrograms from "@/components/sections/OurPrograms";
import AnnualReports from "@/components/sections/AnnualReports";
import SupportMission from "@/components/sections/SupportMission";
import ContactUs from "@/components/sections/ContactUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WhoWeAre />
      <OurPrograms />
      <AnnualReports />
      <SupportMission />
      <ContactUs />
    </>
  );
}

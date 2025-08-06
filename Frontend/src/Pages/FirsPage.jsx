import HeroSection from "../components/FirstPage/HeroSection";
import FeaturedProperties from "./../components/FirstPage/FeaturedProperties";
import LuxuryVillas from "./../components/FirstPage/LuxuryVillas";
import PlanYourStay from "./../components/FirstPage/PlanYourStay";
import Contact from "./../components/FirstPage/Contact";
import FloatingVideo from "./../components/FirstPage/FloatingVideo";
import Footer from "./../components/FirstPage/Footer";
import Header from "./../components/FirstPage/Header";

const FirstPage = () => {
  return (
    <div className="bg-[#0D1117]">
      <Header />
      <HeroSection />
      <FeaturedProperties />
      <LuxuryVillas />
      <PlanYourStay />
      <Contact />
      {/* <FloatingVideo /> */}
      <Footer />
    </div>
  );
};

export default FirstPage;

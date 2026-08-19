import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CollegePreview from "../components/CollegePreview";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main>
        <Hero />
        <CollegePreview />
        <HowItWorks />
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
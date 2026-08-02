import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TechMarquee from "@/components/landing/TechMarquee";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import WhyUse from "@/components/landing/WhyUse";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <HowItWorks />
        <Features />
        <WhyUse />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

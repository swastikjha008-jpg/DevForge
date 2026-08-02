import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import GenerateFlow from "@/components/generate/GenerateFlow";

export const metadata: Metadata = {
  title: "Generate — DevForge",
  description: "Describe your application and generate a production-ready starter project.",
};

export default function GeneratePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <GenerateFlow />
      </main>
      <Footer />
    </>
  );
}

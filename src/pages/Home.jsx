import Navbar from "../components/navbar/Navbar";

import Hero from "../components/home/Hero";

import ProductSection from "../components/home/ProductSection";

import AboutSection from "../components/home/AboutSection";

import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />

        <ProductSection />

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

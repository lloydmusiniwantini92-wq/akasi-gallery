import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Shop from "@/components/Shop";
import Press from "@/components/Press";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Gallery />
      <About />
      <Shop />
      <Press />
      <Contact />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import AnimatedLogoCloud from "@/components/AnimatedLogoCloud";
import HoverSpring from "@/components/HoverSpring";
import Works from "@/components/Works";
import CTA from "@/components/CTA";
export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <HoverSpring />
      <AnimatedLogoCloud />
      <Works />
      <Testimonial direction="left" />
      <CTA />
    </main>
  );
}

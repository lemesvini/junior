"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LiveModal from "@/components/LiveModal";

const testimonials = [
  {
    name: "João Vitor",
    role: "Web Developer",
    image: "https://i.imgur.com/LgSv1pz.jpeg",
    text: "The real-time collaboration feature has transformed how i code myself and with my team."
  },
  {
    name: "Mike Johnson",
    role: "Tech Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    text: "The integrated JSON tools save me time every day. It's become an essential part of my workflow."
  },
  {
    name: "Alex Rivera",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    text: "Clean interface, powerful features, and great performance. Exactly what I needed."
  }
];

export default function Home() {
  const [liveModal, setLivemodal] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {liveModal && <LiveModal setLivemodal={setLivemodal} />}
      
      <div className="relative">
        <Navigation setLivemodal={setLivemodal} />
        <Hero setLivemodal={setLivemodal} />
        <Features setLivemodal={setLivemodal} />
        <Testimonials testimonials={testimonials} />
        <Stats />
        <CTA setLivemodal={setLivemodal} />
        <Footer />
      </div>
    </main>
  );
}

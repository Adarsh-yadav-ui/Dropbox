"use client";
import { Hero } from "../../components/Hero";
import { Features } from "../../components/Features";
import { ProductShowcase } from "../../components/ProductShowcase";
import { Navbar } from "../../components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Features />
    </div>
  );
}

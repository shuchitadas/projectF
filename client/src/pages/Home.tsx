import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BecomeMentorSection from "@/components/home/BecomeMentorSection";
import FAQSection from "@/components/home/FAQSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MentorMatch - Find Your Perfect Tech Mentor</title>
        <meta name="description" content="Connect with experienced tech professionals who can guide your career, help you master new skills, and accelerate your growth." />
      </Helmet>
      
      <div className="flex flex-col gap-0">
        <HeroSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <BecomeMentorSection />
        <FAQSection />
        <CallToAction />
      </div>
    </>
  );
}

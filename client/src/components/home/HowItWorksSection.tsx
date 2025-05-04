import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How MentorMatch Works</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            A simple process to connect with the right mentor and accelerate your career
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Browse & Select a Mentor</h3>
              <p className="mt-2 text-base text-gray-500">
                Search our diverse pool of verified mentors using filters like skills, industry, and price to find the perfect match.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Schedule a Free Introduction</h3>
              <p className="mt-2 text-base text-gray-500">
                Book a 15-minute call to discuss your goals, confirm fit, and decide if you want to proceed with the mentorship.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Start Your Mentorship</h3>
              <p className="mt-2 text-base text-gray-500">
                Choose a subscription plan, get matched, and begin regular 1:1 sessions tailored to your specific goals and needs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/browse-mentors">
            <Button size="lg">
              Find Your Mentor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

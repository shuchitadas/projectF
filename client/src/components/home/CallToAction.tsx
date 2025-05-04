import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center lg:max-w-3xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to accelerate your career?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-100">
                Find a mentor who's been where you want to go. Get personalized guidance, support, and accountability to reach your goals faster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/browse-mentors">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Find a Mentor
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto text-white border-white hover:bg-primary-800/60"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

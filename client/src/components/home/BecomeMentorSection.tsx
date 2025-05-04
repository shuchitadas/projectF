import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function BecomeMentorSection() {
  return (
    <section className="bg-primary-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Become a Mentor</h2>
            <p className="mt-4 text-lg text-primary-100">
              Share your expertise, build your personal brand, and earn additional income while helping others grow in their careers.
            </p>
            <div className="mt-8">
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary-300" />
                  </div>
                  <p className="ml-3 text-base text-primary-100">Set your own rates and availability</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary-300" />
                  </div>
                  <p className="ml-3 text-base text-primary-100">Connect with motivated professionals in your field</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary-300" />
                  </div>
                  <p className="ml-3 text-base text-primary-100">Enhance your leadership and communication skills</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary-300" />
                  </div>
                  <p className="ml-3 text-base text-primary-100">Build a professional network across industries</p>
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <Link href="/become-mentor">
                <Button variant="secondary" size="lg">
                  Apply to Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-lg shadow-xl overflow-hidden">
              <svg
                className="w-full h-auto"
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="600" fill="#4338ca" />
                <circle cx="400" cy="300" r="200" fill="#4f46e5" />
                <circle cx="400" cy="300" r="150" fill="#6366f1" />
                <circle cx="400" cy="300" r="100" fill="#818cf8" />
                <circle cx="400" cy="300" r="50" fill="#a5b4fc" />
                <text
                  x="400"
                  y="300"
                  fontFamily="Arial"
                  fontSize="24"
                  textAnchor="middle"
                  fill="#ffffff"
                >
                  Become a Mentor
                </text>
                <path
                  d="M250,180 Q400,100 550,180 T700,300 Q550,400 400,500 Q250,400 100,300 Q250,200 250,180 Z"
                  fill="none"
                  stroke="#e0e7ff"
                  strokeWidth="8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Find Your Perfect Tech Mentor
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Connect with experienced professionals who can guide your career, help you master new skills, and accelerate your growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/browse-mentors">
                <Button className="w-full sm:w-auto" size="lg">
                  Browse Mentors
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="w-full sm:w-auto mt-3 sm:mt-0" size="lg">
                  How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-1 overflow-hidden">
                <Avatar className="border-2 border-white h-6 w-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-6 w-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-6 w-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              </div>
              <span className="ml-2 text-sm text-gray-500">Join 2,500+ mentees and 300+ mentors</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-lg shadow-xl overflow-hidden">
              <svg
                className="w-full h-auto"
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="600" fill="#f8fafc" />
                <circle cx="400" cy="300" r="200" fill="#e0e7ff" />
                <path
                  d="M500,250 Q530,300 500,350 T500,450"
                  stroke="#818cf8"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M350,200 Q300,300 350,400 T350,500"
                  stroke="#6366f1"
                  strokeWidth="8"
                  fill="none"
                />
                <circle cx="340" cy="250" r="40" fill="#4f46e5" />
                <circle cx="460" cy="350" r="40" fill="#4338ca" />
                <text
                  x="400"
                  y="300"
                  fontFamily="Arial"
                  fontSize="24"
                  textAnchor="middle"
                  fill="#1e293b"
                >
                  Mentorship Connection
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

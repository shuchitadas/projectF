import { Link } from "wouter";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white text-2xl font-bold mb-4">Mentoring</div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting ambitious professionals with experienced mentors to accelerate careers and foster growth in the tech industry.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/browse-mentors">
                  <a className="text-base text-gray-400 hover:text-white">Browse Mentors</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-base text-gray-400 hover:text-white">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#pricing">
                  <a className="text-base text-gray-400 hover:text-white">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/browse-mentors">
                  <a className="text-base text-gray-400 hover:text-white">Success Stories</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/how-it-works#faq">
                  <a className="text-base text-gray-400 hover:text-white">FAQ</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} MentorMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

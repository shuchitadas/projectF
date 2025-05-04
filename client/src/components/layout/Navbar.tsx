import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navigation = [
    { name: "Browse Mentors", href: "/browse-mentors" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/how-it-works#pricing" },
    { name: "For Mentors", href: "/become-mentor" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="text-2xl font-bold text-primary">
                  MentorMatch
                </a>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      isActive(item.href)
                        ? "border-primary text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/login">
              <a className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                Log in
              </a>
            </Link>
            <Link href="/register">
              <Button size="sm" className="ml-3">
                Sign up
              </Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col mt-6 space-y-6">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className="text-base font-medium text-gray-900 hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-gray-200">
                    <Link href="/login">
                      <a
                        className="text-base font-medium text-gray-900 hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </a>
                    </Link>
                    <Link href="/register">
                      <a
                        className="mt-4 block w-full px-4 py-2 text-center text-base font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </a>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

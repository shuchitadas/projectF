import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";
import { Link } from "wouter";

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Mentees Say</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Hear from professionals who have accelerated their careers with MentorMatch
          </p>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Working with Sarah completely transformed my career trajectory. Her guidance helped me improve my React skills and land a senior role at a top tech company. The structured approach to our sessions made every minute valuable."
                </p>
                <div className="mt-6 flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/33.jpg" alt="Jessica Lee" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-gray-900">Jessica Lee</h4>
                    <p className="text-sm text-gray-600">Frontend Developer at Spotify</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "As someone transitioning into tech from a non-CS background, finding David as a mentor was game-changing. He helped me understand machine learning concepts in a practical way and guided me through building my first production ML model."
                </p>
                <div className="mt-6 flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="Marcus Chen" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-gray-900">Marcus Chen</h4>
                    <p className="text-sm text-gray-600">Data Scientist at Stripe</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/browse-mentors">
              <a className="text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1">
                Read more success stories <ExternalLink className="h-4 w-4" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

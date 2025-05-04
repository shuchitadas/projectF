import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageCircle, Star, StarHalf, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BookingForm from "@/components/mentors/BookingForm";
import MessageForm from "@/components/mentors/MessageForm";

export default function MentorProfile() {
  const { id } = useParams<{ id: string }>();
  const mentorId = parseInt(id);
  const [activeTab, setActiveTab] = useState("about");
  const { toast } = useToast();

  // Fetch mentor data
  const { data: mentor, isLoading, isError } = useQuery({
    queryKey: [`/api/mentors/${mentorId}`],
  });

  // Fetch mentor reviews
  const { data: reviews } = useQuery({
    queryKey: [`/api/mentors/${mentorId}/reviews`],
    enabled: !!mentorId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 h-24 w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mt-4"></div>
          <div className="h-4 bg-gray-300 rounded w-32 mt-2"></div>
          <div className="h-4 bg-gray-300 rounded w-64 mt-6"></div>
        </div>
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Mentor not found</h2>
        <p className="mt-2 text-gray-600">The mentor you're looking for doesn't exist or there was an error.</p>
        <Link href="/browse-mentors">
          <a className="mt-6 inline-flex items-center text-primary hover:text-primary/80">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to browse mentors
          </a>
        </Link>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    profilePicture,
    position,
    company,
    bio,
    title,
    skills,
    hourlyRate,
    monthlyRate,
    availability
  } = mentor;

  return (
    <>
      <Helmet>
        <title>{`${firstName} ${lastName} - Mentor Profile | MentorMatch`}</title>
        <meta name="description" content={`Connect with ${firstName} ${lastName}, ${position} at ${company}. ${bio?.substring(0, 150)}...`} />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/browse-mentors">
            <a className="inline-flex items-center text-primary hover:text-primary/80">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to browse mentors
            </a>
          </Link>
          
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Mentor Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 rounded-full">
                      <AvatarImage 
                        src={profilePicture || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6366f1&color=fff`} 
                        alt={`${firstName} ${lastName}`} 
                      />
                      <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">{`${firstName} ${lastName}`}</h1>
                    <p className="text-gray-600">{title}</p>
                    
                    {position && company && (
                      <p className="mt-1 text-sm text-gray-500">{`${position} at ${company}`}</p>
                    )}
                    
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        <StarHalf className="h-4 w-4 fill-current" />
                      </div>
                      <span className="ml-1 text-sm text-gray-500">({reviews?.length || 0} reviews)</span>
                    </div>
                    
                    <div className="mt-6 w-full">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">Hourly Rate</span>
                        </div>
                        <span className="font-medium">${hourlyRate}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">Monthly Rate</span>
                        </div>
                        <span className="font-medium">${monthlyRate}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">Availability</span>
                        </div>
                        <span className="text-sm">{availability}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col gap-3 w-full">
                      <Button 
                        onClick={() => {
                          setActiveTab("booking");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full"
                      >
                        Book a Session
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setActiveTab("message");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="booking">Booking</TabsTrigger>
                  <TabsTrigger value="message">Message</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {firstName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{bio}</p>
                      
                      <h3 className="mt-6 font-semibold text-lg text-gray-900">Expertise</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skills?.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="mt-6 font-semibold text-lg text-gray-900">Reviews</h3>
                      {reviews && reviews.length > 0 ? (
                        <div className="mt-4 space-y-4">
                          {reviews.map((review: any) => (
                            <div key={review.id} className="border-b border-gray-200 pb-4">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage 
                                    src={review.mentee?.profilePicture || `https://ui-avatars.com/api/?name=${review.mentee?.firstName}+${review.mentee?.lastName}&background=6366f1&color=fff`} 
                                    alt={`${review.mentee?.firstName} ${review.mentee?.lastName}`} 
                                  />
                                  <AvatarFallback>{review.mentee ? `${review.mentee.firstName?.charAt(0)}${review.mentee.lastName?.charAt(0)}` : 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{review.mentee ? `${review.mentee.firstName} ${review.mentee.lastName}` : 'Anonymous'}</p>
                                  {review.mentee?.position && review.mentee?.company && (
                                    <p className="text-xs text-gray-500">{`${review.mentee.position} at ${review.mentee.company}`}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex text-yellow-400 mt-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                              </div>
                              <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                              <p className="mt-1 text-xs text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-gray-600">No reviews yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="booking" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Book a Session with {firstName}</CardTitle>
                      <CardDescription>
                        Fill in the details below to schedule your mentoring session
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BookingForm 
                        mentorId={mentorId} 
                        mentorName={`${firstName} ${lastName}`}
                        hourlyRate={hourlyRate}
                        onSuccess={() => {
                          toast({
                            title: "Booking request sent!",
                            description: `${firstName} will confirm your booking soon.`,
                          });
                          setActiveTab("about");
                        }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="message" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Message {firstName}</CardTitle>
                      <CardDescription>
                        Send a message to connect with {firstName} and discuss how they can help you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MessageForm 
                        mentorId={mentorId}
                        mentorName={`${firstName} ${lastName}`}
                        onSuccess={() => {
                          toast({
                            title: "Message sent!",
                            description: `${firstName} will respond to your message soon.`,
                          });
                          setActiveTab("about");
                        }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

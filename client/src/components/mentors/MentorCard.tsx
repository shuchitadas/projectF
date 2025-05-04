import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf } from "lucide-react";

interface MentorCardProps {
  mentor: {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    position?: string;
    company?: string;
    bio?: string;
    skills?: string[];
    monthlyRate?: number;
  };
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const {
    id,
    firstName,
    lastName,
    profilePicture,
    position,
    company,
    bio,
    skills,
    monthlyRate
  } = mentor;

  // Generate the skill badge color based on the skill name
  const getSkillColor = (skill: string) => {
    const colors = ["blue", "purple", "green", "yellow", "red", "pink", "orange"];
    const index = Math.abs(skill.charCodeAt(0) + skill.charCodeAt(skill.length - 1)) % colors.length;
    return colors[index];
  };

  // Helper for skill badge classes
  const getSkillClasses = (skill: string) => {
    const color = getSkillColor(skill);
    
    const colorClasses: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      red: "bg-red-100 text-red-800",
      pink: "bg-pink-100 text-pink-800",
      orange: "bg-orange-100 text-orange-800"
    };
    
    return colorClasses[color];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage 
              src={profilePicture || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6366f1&color=fff`} 
              alt={`${firstName} ${lastName}`} 
            />
            <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{`${firstName} ${lastName}`}</h3>
            {position && company && (
              <p className="text-sm text-gray-600">{`${position} at ${company}`}</p>
            )}
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <StarHalf className="h-4 w-4 fill-current" />
              </div>
              <span className="ml-1 text-sm text-gray-500">(24 reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3">{bio}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {skills?.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className={`${getSkillClasses(skill)}`}>
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">From <span className="font-medium text-gray-900">${monthlyRate}</span> / month</p>
          </div>
          <Link href={`/mentors/${id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

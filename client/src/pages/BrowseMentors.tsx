import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import MentorSearch from "@/components/mentors/MentorSearch";
import MentorCard from "@/components/mentors/MentorCard";
import { PaginationComponent } from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

export default function BrowseMentors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    skills: [] as string[],
    priceRange: { min: undefined, max: undefined } as { min?: number, max?: number },
    availability: ""
  });

  // Fetch mentors
  const { data: mentors, isLoading, isError } = useQuery({
    queryKey: ['/api/mentors'],
    staleTime: 60000, // 1 minute
  });

  // Fetch skills for filter
  const { data: skills } = useQuery({
    queryKey: ['/api/skills'],
    staleTime: 300000, // 5 minutes
  });

  // Pagination logic
  const MENTORS_PER_PAGE = 6;
  
  // Filter mentors based on search criteria
  const filteredMentors = mentors ? mentors.filter((mentor: any) => {
    // Filter by search query
    if (searchFilters.query && !(`${mentor.firstName} ${mentor.lastName}`.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        (mentor.company && mentor.company.toLowerCase().includes(searchFilters.query.toLowerCase())) ||
        (mentor.position && mentor.position.toLowerCase().includes(searchFilters.query.toLowerCase())) ||
        (mentor.bio && mentor.bio.toLowerCase().includes(searchFilters.query.toLowerCase())))) {
      return false;
    }
    
    // Filter by skills
    if (searchFilters.skills.length > 0 && (!mentor.skills || !searchFilters.skills.some(skill => mentor.skills.includes(skill)))) {
      return false;
    }
    
    // Filter by price range
    if (searchFilters.priceRange.min !== undefined && (!mentor.monthlyRate || mentor.monthlyRate < searchFilters.priceRange.min)) {
      return false;
    }
    
    if (searchFilters.priceRange.max !== undefined && (!mentor.monthlyRate || mentor.monthlyRate > searchFilters.priceRange.max)) {
      return false;
    }
    
    // Filter by availability
    if (searchFilters.availability && (!mentor.availability || !mentor.availability.includes(searchFilters.availability))) {
      return false;
    }
    
    return true;
  }) : [];
  
  const totalPages = Math.ceil((filteredMentors?.length || 0) / MENTORS_PER_PAGE);
  const paginatedMentors = filteredMentors?.slice(
    (currentPage - 1) * MENTORS_PER_PAGE,
    currentPage * MENTORS_PER_PAGE
  );

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <>
      <Helmet>
        <title>Browse Mentors - MentorMatch</title>
        <meta name="description" content="Find the perfect tech mentor to help you advance your career and build new skills." />
      </Helmet>
      
      <section id="browse-mentors" className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Find Your Mentor</h2>
            <p className="mt-2 text-lg text-gray-600">Browse our carefully vetted mentors from top tech companies</p>
          </div>
          
          <MentorSearch 
            skills={skills || []} 
            onSearch={handleSearch} 
            initialFilters={searchFilters}
          />
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-700">Sorry, we couldn't load mentors at this time. Please try again later.</p>
            </div>
          ) : paginatedMentors?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-700">No mentors found matching your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {paginatedMentors?.map((mentor: any) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

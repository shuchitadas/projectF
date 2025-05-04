import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface SearchFilters {
  query: string;
  skills: string[];
  priceRange: { min?: number; max?: number };
  availability: string;
}

interface MentorSearchProps {
  skills: Skill[];
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

export default function MentorSearch({ skills, onSearch, initialFilters }: MentorSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.query);
  
  // Price range options
  const priceRanges = [
    { label: "Any Price", value: "any" },
    { label: "$0 - $50 / month", value: "0-50" },
    { label: "$51 - $100 / month", value: "51-100" },
    { label: "$101 - $200 / month", value: "101-200" },
    { label: "$201+ / month", value: "201+" }
  ];
  
  // Availability options
  const availabilityOptions = [
    { label: "All Availabilities", value: "" },
    { label: "Weekdays", value: "Weekdays" },
    { label: "Weekends", value: "Weekends" },
    { label: "Evenings", value: "Evenings" },
    { label: "Flexible", value: "Flexible" }
  ];
  
  // Categorize skills
  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));
  
  // Apply filters
  const applyFilters = () => {
    onSearch(filters);
  };
  
  // Handle price range changes
  const handlePriceRangeChange = (value: string) => {
    let priceRange = { min: undefined, max: undefined };
    
    if (value === "0-50") {
      priceRange = { min: 0, max: 50 };
    } else if (value === "51-100") {
      priceRange = { min: 51, max: 100 };
    } else if (value === "101-200") {
      priceRange = { min: 101, max: 200 };
    } else if (value === "201+") {
      priceRange = { min: 201, max: undefined };
    }
    
    setFilters(prev => ({ ...prev, priceRange }));
  };
  
  // Handle skill selection
  const handleSkillSelect = (skill: string) => {
    setFilters(prev => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
        
      return { ...prev, skills: updatedSkills };
    });
  };
  
  // Remove a selected filter
  const removeFilter = (type: 'skill' | 'price' | 'availability', value?: string) => {
    setFilters(prev => {
      switch (type) {
        case 'skill':
          return { ...prev, skills: prev.skills.filter(skill => skill !== value) };
        case 'price':
          return { ...prev, priceRange: { min: undefined, max: undefined } };
        case 'availability':
          return { ...prev, availability: '' };
        default:
          return prev;
      }
    });
  };
  
  // Determine current price range value for select
  const getCurrentPriceRangeValue = () => {
    const { min, max } = filters.priceRange;
    
    if (min === 0 && max === 50) return "0-50";
    if (min === 51 && max === 100) return "51-100";
    if (min === 101 && max === 200) return "101-200";
    if (min === 201 && max === undefined) return "201+";
    
    return "any";
  };
  
  // Submit search on enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setFilters(prev => ({ ...prev, query: searchInput }));
    }
  };
  
  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters.skills, filters.priceRange, filters.availability]);
  
  // Apply search query when search button is clicked or enter is pressed
  const handleSearchClick = () => {
    setFilters(prev => ({ ...prev, query: searchInput }));
  };
  
  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by name, skills, or company"
                className="pl-10 pr-12 py-6"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button 
                  type="button" 
                  className="text-primary hover:text-primary-dark"
                  onClick={handleSearchClick}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <Select onValueChange={value => handleSkillSelect(value)}>
              <SelectTrigger className="py-6">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map(category => (
                  <div key={category} className="mb-2">
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500">{category}</div>
                    {skills.filter(skill => skill.category === category).map(skill => (
                      <SelectItem key={skill.id} value={skill.name}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select 
              value={getCurrentPriceRangeValue()} 
              onValueChange={handlePriceRangeChange}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
              {skill} 
              <button 
                type="button" 
                onClick={() => removeFilter('skill', skill)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {(filters.priceRange.min !== undefined || filters.priceRange.max !== undefined) && (
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {filters.priceRange.min !== undefined && `$${filters.priceRange.min}`}
              {filters.priceRange.min !== undefined && filters.priceRange.max !== undefined && " - "}
              {filters.priceRange.max !== undefined && `$${filters.priceRange.max}`}
              {filters.priceRange.min === 201 && "+"}
              <button 
                type="button" 
                onClick={() => removeFilter('price')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.availability && (
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {filters.availability}
              <button 
                type="button" 
                onClick={() => removeFilter('availability')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

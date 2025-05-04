import {
  users,
  skills,
  reviews,
  bookings,
  messages,
  type User,
  type InsertUser,
  type Skill,
  type InsertSkill,
  type Review,
  type InsertReview,
  type Booking,
  type InsertBooking,
  type Message,
  type InsertMessage,
  type MentorSearchFilters,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Mentor operations
  getMentors(): Promise<User[]>;
  searchMentors(filters: MentorSearchFilters): Promise<User[]>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Review operations
  getReviewsByMentor(mentorId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Booking operations
  getBookingsByMentor(mentorId: number): Promise<Booking[]>;
  getBookingsByMentee(menteeId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Message operations
  getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private reviews: Map<number, Review>;
  private bookings: Map<number, Booking>;
  private messages: Map<number, Message>;
  private currentUserId: number;
  private currentSkillId: number;
  private currentReviewId: number;
  private currentBookingId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.reviews = new Map();
    this.bookings = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentSkillId = 1;
    this.currentReviewId = 1;
    this.currentBookingId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample skills
    const skillsList = [
      { name: "React", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "JavaScript", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Python", category: "Backend" },
      { name: "Java", category: "Backend" },
      { name: "Kotlin", category: "Mobile" },
      { name: "Swift", category: "Mobile" },
      { name: "UX Design", category: "Design" },
      { name: "UI Design", category: "Design" },
      { name: "System Design", category: "Architecture" },
      { name: "Microservices", category: "Architecture" },
      { name: "AWS", category: "DevOps" },
      { name: "Kubernetes", category: "DevOps" },
      { name: "Machine Learning", category: "Data Science" },
      { name: "TensorFlow", category: "Data Science" },
      { name: "Leadership", category: "Soft Skills" },
      { name: "Career Growth", category: "Soft Skills" },
    ];
    
    skillsList.forEach(skill => {
      this.createSkill({
        name: skill.name,
        category: skill.category,
      });
    });
    
    // Sample mentors
    const mentors = [
      {
        email: "sarah@example.com",
        password: "password123",
        firstName: "Sarah",
        lastName: "Chen",
        bio: "Helping engineers level up their frontend skills and navigate big tech careers. Specialized in React, TypeScript, and system design.",
        profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
        position: "Senior Software Engineer",
        company: "Google",
        isMentor: true,
        title: "Frontend Expert & Career Coach",
        hourlyRate: 80,
        monthlyRate: 120,
        availability: "Weekends",
        skills: ["React", "TypeScript", "System Design", "Career Growth"],
      },
      {
        email: "alex@example.com",
        password: "password123",
        firstName: "Alex",
        lastName: "Rodriguez",
        bio: "Backend specialist with 12+ years of experience building highly scalable systems. Expert in microservices, distributed systems, and Java/Kotlin.",
        profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
        position: "Staff Engineer",
        company: "Netflix",
        isMentor: true,
        title: "Backend & Systems Architect",
        hourlyRate: 100,
        monthlyRate: 180,
        availability: "Weekdays evenings",
        skills: ["Java", "Kotlin", "Microservices", "System Design"],
      },
      {
        email: "priya@example.com",
        password: "password123",
        firstName: "Priya",
        lastName: "Patel",
        bio: "Experienced engineering manager helping developers transition to leadership roles. Guidance on team management, technical strategy, and career advancement.",
        profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
        position: "Engineering Manager",
        company: "Shopify",
        isMentor: true,
        title: "Tech Leadership Coach",
        hourlyRate: 90,
        monthlyRate: 150,
        availability: "Flexible",
        skills: ["Leadership", "Career Growth", "Tech Strategy", "Team Building"],
      },
      {
        email: "david@example.com",
        password: "password123",
        firstName: "David",
        lastName: "Kim",
        bio: "ML specialist focused on helping engineers transition into AI and data science. Experience with TensorFlow, PyTorch, and production ML systems.",
        profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
        position: "Machine Learning Engineer",
        company: "Microsoft",
        isMentor: true,
        title: "AI & ML Expert",
        hourlyRate: 120,
        monthlyRate: 200,
        availability: "Weekdays",
        skills: ["Machine Learning", "Python", "TensorFlow", "PyTorch"],
      },
      {
        email: "emma@example.com",
        password: "password123",
        firstName: "Emma",
        lastName: "Wilson",
        bio: "Helping designers and developers improve their UX skills. Specialized in user research, interaction design, and building design systems.",
        profilePicture: "https://randomuser.me/api/portraits/women/90.jpg",
        position: "UX Designer",
        company: "Airbnb",
        isMentor: true,
        title: "UX/UI Design Mentor",
        hourlyRate: 85,
        monthlyRate: 140,
        availability: "Weekends",
        skills: ["UX Design", "UI Design", "Design Systems", "User Research"],
      },
      {
        email: "michael@example.com",
        password: "password123",
        firstName: "Michael",
        lastName: "Johnson",
        bio: "DevOps and cloud infrastructure expert. Helping engineers master AWS, CI/CD pipelines, Kubernetes, and infrastructure as code.",
        profilePicture: "https://randomuser.me/api/portraits/men/46.jpg",
        position: "DevOps Lead",
        company: "Amazon",
        isMentor: true,
        title: "Cloud & DevOps Specialist",
        hourlyRate: 95,
        monthlyRate: 160,
        availability: "Weekdays evenings",
        skills: ["AWS", "Kubernetes", "DevOps", "Terraform"],
      },
    ];
    
    mentors.forEach(mentor => {
      this.createUser(mentor);
    });
    
    // Sample mentees
    const mentees = [
      {
        email: "jessica@example.com",
        password: "password123",
        firstName: "Jessica",
        lastName: "Lee",
        bio: "Frontend developer looking to improve React skills and grow my career.",
        profilePicture: "https://randomuser.me/api/portraits/women/33.jpg",
        position: "Frontend Developer",
        company: "Spotify",
        isMentor: false,
      },
      {
        email: "marcus@example.com",
        password: "password123",
        firstName: "Marcus",
        lastName: "Chen",
        bio: "Transitioning into data science from a non-CS background.",
        profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
        position: "Data Scientist",
        company: "Stripe",
        isMentor: false,
      },
    ];
    
    mentees.forEach(mentee => {
      this.createUser(mentee);
    });
    
    // Sample reviews
    const reviewsData = [
      {
        mentorId: 1,
        menteeId: 7,
        rating: 5,
        comment: "Working with Sarah completely transformed my career trajectory. Her guidance helped me improve my React skills and land a senior role at a top tech company. The structured approach to our sessions made every minute valuable."
      },
      {
        mentorId: 4,
        menteeId: 8,
        rating: 5,
        comment: "As someone transitioning into tech from a non-CS background, finding David as a mentor was game-changing. He helped me understand machine learning concepts in a practical way and guided me through building my first production ML model."
      },
    ];
    
    reviewsData.forEach(review => {
      this.createReview(review);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Mentor operations
  async getMentors(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.isMentor);
  }

  async searchMentors(filters: MentorSearchFilters): Promise<User[]> {
    let mentors = await this.getMentors();
    
    // Filter by search query (name, company, position, bio)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      mentors = mentors.filter(mentor => 
        `${mentor.firstName} ${mentor.lastName}`.toLowerCase().includes(query) ||
        (mentor.company && mentor.company.toLowerCase().includes(query)) ||
        (mentor.position && mentor.position.toLowerCase().includes(query)) ||
        (mentor.bio && mentor.bio.toLowerCase().includes(query))
      );
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      mentors = mentors.filter(mentor => 
        mentor.skills && filters.skills!.some(skill => mentor.skills!.includes(skill))
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        mentors = mentors.filter(mentor => 
          mentor.monthlyRate && mentor.monthlyRate >= filters.priceRange!.min!
        );
      }
      
      if (filters.priceRange.max !== undefined) {
        mentors = mentors.filter(mentor => 
          mentor.monthlyRate && mentor.monthlyRate <= filters.priceRange!.max!
        );
      }
    }
    
    // Filter by availability
    if (filters.availability) {
      mentors = mentors.filter(mentor => 
        mentor.availability && mentor.availability.includes(filters.availability!)
      );
    }
    
    return mentors;
  }

  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      skill => skill.category === category
    );
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const newSkill: Skill = { ...skill, id };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  // Review operations
  async getReviewsByMentor(mentorId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.mentorId === mentorId
    );
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const newReview: Review = { 
      ...review, 
      id, 
      createdAt: new Date() 
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  // Booking operations
  async getBookingsByMentor(mentorId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.mentorId === mentorId
    );
  }

  async getBookingsByMentee(menteeId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.menteeId === menteeId
    );
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const newBooking: Booking = { ...booking, id };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Message operations
  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      message => 
        (message.senderId === user1Id && message.receiverId === user2Id) || 
        (message.senderId === user2Id && message.receiverId === user1Id)
    ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = { 
      ...message, 
      id, 
      createdAt: new Date(),
      read: false 
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
}

export const storage = new MemStorage();

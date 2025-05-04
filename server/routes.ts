import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertReviewSchema,
  insertBookingSchema,
  insertMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all prefixed with /api
  
  // Get all mentors
  app.get("/api/mentors", async (req: Request, res: Response) => {
    try {
      const mentors = await storage.getMentors();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mentors" });
    }
  });

  // Search mentors with filters
  app.get("/api/mentors/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string | undefined;
      const skills = req.query.skills ? (req.query.skills as string).split(",") : undefined;
      const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined;
      const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;
      const availability = req.query.availability as string | undefined;

      const filters = {
        query,
        skills,
        priceRange: {
          min: minPrice,
          max: maxPrice
        },
        availability
      };

      const mentors = await storage.searchMentors(filters);
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ message: "Failed to search mentors" });
    }
  });

  // Get mentor by ID
  app.get("/api/mentors/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const mentor = await storage.getUser(id);
      
      if (!mentor || !mentor.isMentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mentor" });
    }
  });

  // Get mentor reviews
  app.get("/api/mentors/:id/reviews", async (req: Request, res: Response) => {
    try {
      const mentorId = parseInt(req.params.id);
      const reviews = await storage.getReviewsByMentor(mentorId);
      
      // Enrich reviews with mentee information
      const enrichedReviews = await Promise.all(
        reviews.map(async (review) => {
          const mentee = await storage.getUser(review.menteeId);
          return {
            ...review,
            mentee: mentee ? {
              id: mentee.id,
              firstName: mentee.firstName,
              lastName: mentee.lastName,
              profilePicture: mentee.profilePicture,
              position: mentee.position,
              company: mentee.company
            } : null
          };
        })
      );
      
      res.json(enrichedReviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create a review for a mentor
  app.post("/api/mentors/:id/reviews", async (req: Request, res: Response) => {
    try {
      const mentorId = parseInt(req.params.id);
      const mentor = await storage.getUser(mentorId);
      
      if (!mentor || !mentor.isMentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Validate request body
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        mentorId
      });
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Get all skills
  app.get("/api/skills", async (req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Get skills by category
  app.get("/api/skills/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const skills = await storage.getSkillsByCategory(category);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills by category" });
    }
  });

  // User registration
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Validate request body
      const userData = insertUserSchema.parse(req.body);
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // User login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Create a booking
  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Check if mentor exists
      const mentor = await storage.getUser(bookingData.mentorId);
      if (!mentor || !mentor.isMentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      
      // Check if mentee exists
      const mentee = await storage.getUser(bookingData.menteeId);
      if (!mentee) {
        return res.status(404).json({ message: "Mentee not found" });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get bookings for a mentee
  app.get("/api/mentees/:id/bookings", async (req: Request, res: Response) => {
    try {
      const menteeId = parseInt(req.params.id);
      const bookings = await storage.getBookingsByMentee(menteeId);
      
      // Enrich bookings with mentor information
      const enrichedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const mentor = await storage.getUser(booking.mentorId);
          return {
            ...booking,
            mentor: mentor ? {
              id: mentor.id,
              firstName: mentor.firstName,
              lastName: mentor.lastName,
              profilePicture: mentor.profilePicture,
              position: mentor.position,
              company: mentor.company
            } : null
          };
        })
      );
      
      res.json(enrichedBookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Get bookings for a mentor
  app.get("/api/mentors/:id/bookings", async (req: Request, res: Response) => {
    try {
      const mentorId = parseInt(req.params.id);
      const bookings = await storage.getBookingsByMentor(mentorId);
      
      // Enrich bookings with mentee information
      const enrichedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const mentee = await storage.getUser(booking.menteeId);
          return {
            ...booking,
            mentee: mentee ? {
              id: mentee.id,
              firstName: mentee.firstName,
              lastName: mentee.lastName,
              profilePicture: mentee.profilePicture,
              position: mentee.position,
              company: mentee.company
            } : null
          };
        })
      );
      
      res.json(enrichedBookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedBooking = await storage.updateBookingStatus(id, status);
      
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Get messages between two users
  app.get("/api/messages/:user1Id/:user2Id", async (req: Request, res: Response) => {
    try {
      const user1Id = parseInt(req.params.user1Id);
      const user2Id = parseInt(req.params.user2Id);
      
      const messages = await storage.getMessagesBetweenUsers(user1Id, user2Id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send a message
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const messageData = insertMessageSchema.parse(req.body);
      
      // Check if sender exists
      const sender = await storage.getUser(messageData.senderId);
      if (!sender) {
        return res.status(404).json({ message: "Sender not found" });
      }
      
      // Check if receiver exists
      const receiver = await storage.getUser(messageData.receiverId);
      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" });
      }
      
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Mark message as read
  app.patch("/api/messages/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedMessage = await storage.markMessageAsRead(id);
      
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

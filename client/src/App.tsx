import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import FirebaseAuth from "@/components/auth/FirebaseAuth";
import Home from "@/pages/Home";
import BrowseMentors from "@/pages/BrowseMentors";
import MentorProfile from "@/pages/MentorProfile";
import HowItWorks from "@/pages/HowItWorks";
import BecomeMentor from "@/pages/BecomeMentor";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse-mentors" component={BrowseMentors} />
      <Route path="/mentors/:id" component={MentorProfile} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/become-mentor" component={BecomeMentor} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <FirebaseAuth />
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

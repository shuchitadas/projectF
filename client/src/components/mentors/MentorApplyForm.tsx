import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle, Upload } from "lucide-react";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  company: z.string().min(1, { message: "Company is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  experience: z
    .string()
    .min(1, { message: "Years of experience is required" }),
  expertise: z.string().min(1, { message: "Area of expertise is required" }),
  bio: z
    .string()
    .min(100, { message: "Bio must be at least 100 characters" })
    .max(500, { message: "Bio must not exceed 500 characters" }),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL" })
    .optional()
    .or(z.literal("")),
  hourlyRate: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Hourly rate must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Hourly rate must be a positive number",
    }),
  monthlyRate: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Monthly rate must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Monthly rate must be a positive number",
    }),
  availability: z.string().min(1, { message: "Availability is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MentorApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const experienceOptions = [
    "3-5 years",
    "5-7 years",
    "7-10 years",
    "10+ years",
  ];

  const expertiseOptions = [
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Mobile Development",
    "DevOps",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "Product Management",
    "Engineering Management",
  ];

  const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Evenings",
    "Mornings",
    "Flexible",
  ];

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      position: "",
      experience: "",
      expertise: "",
      bio: "",
      linkedinUrl: "",
      hourlyRate: "",
      monthlyRate: "",
      availability: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      // Convert hourlyRate and monthlyRate to numbers
      const userData = {
        ...values,
        hourlyRate: parseInt(values.hourlyRate),
        monthlyRate: parseInt(values.monthlyRate),
        isMentor: true,
        skills: [values.expertise], // Add expertise as a skill
      };

      // Register the mentor
      await apiRequest("POST", "/api/auth/register", userData);

      // Show success toast
      toast({
        title: "Application submitted",
        description:
          "Thank you for applying to be a mentor. We'll review your application and get back to you soon.",
        duration: 5000,
      });

      // Set submitted state to show success message
      setIsSubmitted(true);
    } catch (error) {
      // Show error toast
      toast({
        title: "Application failed",
        description:
          "There was an error submitting your application. This email may already be in use.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-600 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 mr-2" />
            Application Submitted
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 mb-4">
            Thank you for applying to become a mentor on MentorMatch. We've
            received your application and our team will review it within the next
            2-3 business days.
          </p>
          <p className="text-gray-700 mb-4">
            You will receive an email notification once your application has been
            reviewed. If approved, you'll be able to set up your mentor profile
            and start accepting mentees.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentor Application</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Professional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Google, Facebook, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Senior Developer, Tech Lead, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Area of Expertise</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your expertise" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expertiseOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your professional background, expertise, and why you want to be a mentor..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/yourprofile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 items-center gap-4">
                <div>
                  <FormLabel className="text-base">Profile Picture</FormLabel>
                  <FormDescription>
                    Upload a professional headshot (optional)
                  </FormDescription>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or JPEG (max. 2MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Mentorship Details
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            className="pl-7"
                            placeholder="75"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Suggested range: $50-$200 per hour
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Subscription Rate (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            className="pl-7"
                            placeholder="150"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Suggested range: $100-$400 per month
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="When are you available to mentor?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availabilityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

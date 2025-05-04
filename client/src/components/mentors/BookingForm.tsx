import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface BookingFormProps {
  mentorId: number;
  mentorName: string;
  hourlyRate: number;
  onSuccess: () => void;
}

const bookingFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your session.",
  }),
  time: z.string({
    required_error: "Please select a time for your session.",
  }),
  duration: z.number({
    required_error: "Please select the duration of your session.",
  }).min(30, "Sessions must be at least 30 minutes."),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingForm({ mentorId, mentorName, hourlyRate, onSuccess }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Placeholder for the current user ID (would come from auth context in a real app)
  const currentUserId = 7; // Using one of the sample mentee IDs
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: undefined,
      time: "",
      duration: 60,
      notes: "",
    },
  });
  
  async function onSubmit(values: BookingFormValues) {
    try {
      setIsSubmitting(true);
      
      // Format date and time for API
      const bookingDate = new Date(values.date);
      const [hours, minutes] = values.time.split(":").map(Number);
      
      bookingDate.setHours(hours, minutes);
      
      // Calculate end time based on duration
      const endTime = new Date(bookingDate);
      endTime.setMinutes(endTime.getMinutes() + values.duration);
      
      await apiRequest("POST", "/api/bookings", {
        mentorId,
        menteeId: currentUserId,
        startTime: bookingDate.toISOString(),
        endTime: endTime.toISOString(),
        status: "pending",
        notes: values.notes,
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error booking session:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const calculatePrice = (durationMinutes: number) => {
    return ((hourlyRate / 60) * durationMinutes).toFixed(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Session Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    placeholder="Select a time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Duration (minutes)</FormLabel>
              <div className="flex items-center space-x-4">
                <FormControl>
                  <Input
                    type="number"
                    min={30}
                    step={15}
                    placeholder="60"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <span className="text-sm text-gray-500 min-w-[100px]">
                  Cost: ${calculatePrice(field.value || 0)}
                </span>
              </div>
              <FormDescription>
                Minimum duration is 30 minutes. Pricing is ${hourlyRate} per hour.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe what you want to discuss in this session"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Share any specific topics or questions you'd like to cover.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700">Booking Summary</p>
          <p className="text-sm text-gray-600 mt-2">Mentor: {mentorName}</p>
          {form.watch("date") && (
            <p className="text-sm text-gray-600">
              Date: {format(form.watch("date"), "MMMM d, yyyy")}
            </p>
          )}
          {form.watch("time") && (
            <p className="text-sm text-gray-600">
              Time: {form.watch("time")}
            </p>
          )}
          {form.watch("duration") && (
            <p className="text-sm text-gray-600">
              Duration: {form.watch("duration")} minutes
            </p>
          )}
          {form.watch("duration") && (
            <p className="text-sm font-medium text-gray-700 mt-2">
              Total: ${calculatePrice(form.watch("duration"))}
            </p>
          )}
        </div>
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request Booking"
          )}
        </Button>
      </form>
    </Form>
  );
}

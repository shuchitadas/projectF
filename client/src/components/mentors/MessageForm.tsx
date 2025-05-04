import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const messageSchema = z.object({
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface MessageFormProps {
  mentorId: number;
  mentorName: string;
  onSuccess: () => void;
}

export default function MessageForm({
  mentorId,
  mentorName,
  onSuccess,
}: MessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Placeholder for the current user ID (would come from auth context in a real app)
  const currentUserId = 7; // Using one of the sample mentee IDs

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: MessageFormValues) {
    try {
      setIsSubmitting(true);

      await apiRequest("POST", "/api/messages", {
        senderId: currentUserId,
        receiverId: mentorId,
        content: values.message,
      });

      onSuccess();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message to {mentorName}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Introduce yourself to ${mentorName} and explain what you hope to get out of the mentorship...`}
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include specific topics you'd like to discuss and any particular
                goals you have for the mentorship. This helps your mentor prepare
                for your first session.
              </FormDescription>
              <FormDescription>
                {field.value.length}/1000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">Message Tips:</h4>
          <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Be specific about what you want to learn</li>
            <li>Mention your background briefly</li>
            <li>Share your career goals and aspirations</li>
            <li>Ask 1-2 specific questions to start the conversation</li>
          </ul>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}

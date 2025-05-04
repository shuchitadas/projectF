import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function FAQSection() {
  const faqs = [
    {
      question: "How much does mentorship cost?",
      answer: "Mentorship costs vary based on the mentor's experience and expertise. Most mentors offer monthly subscription plans ranging from $100 to $300 per month, which typically includes weekly 1:1 calls and ongoing chat support."
    },
    {
      question: "How are mentors vetted?",
      answer: "All mentors go through a rigorous application process. We verify their professional experience, check references, conduct interviews, and ensure they have the necessary expertise and communication skills to be effective mentors."
    },
    {
      question: "Can I change mentors if it's not a good fit?",
      answer: "Yes! We understand that finding the right mentor is crucial. If you feel your current mentor isn't the right match, you can request a change at any time, and we'll help you find a better fit for your goals and learning style."
    },
    {
      question: "What happens during mentorship sessions?",
      answer: "Sessions are typically 30-60 minutes and are tailored to your specific needs. They can include code reviews, portfolio feedback, career guidance, technical problem-solving, or working through specific challenges you're facing. Many mentors also provide homework and resources between sessions."
    }
  ];

  return (
    <section id="faq" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to know about mentorship on our platform
          </p>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 px-6 py-0 rounded-lg border-none">
                <AccordionTrigger className="text-lg font-medium text-gray-900 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <Link href="/how-it-works#faq">
              <a className="text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1">
                See all FAQs <ExternalLink className="h-4 w-4" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const pricingPlans = [
    {
      name: "Basic",
      price: 99,
      features: [
        "Weekly 30-min 1:1 video calls",
        "Email support (response within 48 hours)",
        "Personalized learning resources",
        "Resume & portfolio review",
      ],
      recommended: false,
    },
    {
      name: "Standard",
      price: 199,
      features: [
        "Weekly 60-min 1:1 video calls",
        "Direct messaging (response within 24 hours)",
        "Personalized learning resources",
        "Resume & portfolio review",
        "Mock interviews & feedback",
        "Personal project guidance",
      ],
      recommended: true,
    },
    {
      name: "Premium",
      price: 299,
      features: [
        "Weekly 60-min 1:1 video calls",
        "Unlimited direct messaging (response within 12 hours)",
        "Personalized learning resources",
        "Resume & portfolio review",
        "Mock interviews & feedback",
        "Personal project guidance",
        "Emergency support sessions",
        "Job search strategy coaching",
      ],
      recommended: false,
    },
  ];

  const faqs = [
    {
      question: "How do I choose the right mentor?",
      answer:
        "Start by identifying your specific goals and the skills you want to develop. Browse mentors with matching expertise and read their profiles carefully. Look for mentors with experience in your desired field or role. We recommend booking an introduction call with a few potential mentors to find the best match for your learning style and objectives.",
    },
    {
      question: "What happens during the free introduction call?",
      answer:
        "The introduction call is a 15-minute video meeting where you can meet your potential mentor, discuss your goals, ask questions about their expertise, and determine if there's a good fit. This gives both parties a chance to see if the mentorship would be beneficial before making any commitments.",
    },
    {
      question: "How long should I work with a mentor?",
      answer:
        "Most successful mentorships last at least 3-6 months, as meaningful growth takes time. However, the duration depends on your specific goals. Some mentees work with mentors for years as they progress through different career stages, while others might need focused guidance for just a few months for a specific project or skill.",
    },
    {
      question: "Can I change mentors if it's not a good fit?",
      answer:
        "Yes, we understand the importance of finding the right mentor. If you feel your current mentor isn't the right match after giving the relationship a fair chance (at least 2-3 sessions), you can switch to another mentor. We'll help facilitate this transition to ensure a smooth experience.",
    },
    {
      question: "How are the mentors vetted?",
      answer:
        "All mentors go through a rigorous application process. We verify their professional experience through references and background checks. We evaluate their communication skills, technical expertise, and teaching ability. Only about 15% of mentor applicants are accepted onto our platform.",
    },
    {
      question: "What's the refund policy?",
      answer:
        "If you're unsatisfied with your first paid mentoring session, we offer a full refund within 7 days of the session. For ongoing mentorships, you can cancel your subscription at any time, and you won't be charged for the following month. We don't offer pro-rated refunds for partially used months.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - MentorMatch</title>
        <meta
          name="description"
          content="Learn how MentorMatch connects you with experienced tech mentors. Discover our simple process for finding the right mentor and accelerating your career."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            How MentorMatch Works
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            A simple, effective process designed to help you find the perfect
            mentor and accelerate your professional growth.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Find the Perfect Mentor in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mt-12">
            <div className="relative">
              <div className="absolute -left-4 -top-4 md:left-1/2 md:-top-8 md:transform md:-translate-x-1/2 bg-primary-100 rounded-full p-6 text-primary font-bold text-2xl">
                1
              </div>
              <Card className="h-full">
                <CardContent className="pt-10 pb-6 px-6 flex flex-col items-center text-center">
                  <div className="h-40 flex items-center justify-center">
                    <svg
                      className="w-32 h-32"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="40"
                        y="40"
                        width="120"
                        height="120"
                        rx="10"
                        fill="#e0e7ff"
                      />
                      <circle cx="100" cy="80" r="20" fill="#818cf8" />
                      <rect
                        x="60"
                        y="110"
                        width="80"
                        height="10"
                        rx="5"
                        fill="#6366f1"
                      />
                      <rect
                        x="70"
                        y="130"
                        width="60"
                        height="10"
                        rx="5"
                        fill="#4f46e5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    Browse & Select a Mentor
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Search our diverse pool of verified mentors using filters
                    like skills, industry, and price to find the perfect match
                    for your goals.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 md:left-1/2 md:-top-8 md:transform md:-translate-x-1/2 bg-primary-100 rounded-full p-6 text-primary font-bold text-2xl">
                2
              </div>
              <Card className="h-full">
                <CardContent className="pt-10 pb-6 px-6 flex flex-col items-center text-center">
                  <div className="h-40 flex items-center justify-center">
                    <svg
                      className="w-32 h-32"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="100" cy="100" r="70" fill="#e0e7ff" />
                      <rect
                        x="80"
                        y="60"
                        width="40"
                        height="40"
                        fill="#818cf8"
                      />
                      <rect
                        x="90"
                        y="50"
                        width="20"
                        height="10"
                        fill="#4f46e5"
                      />
                      <rect
                        x="60"
                        y="110"
                        width="80"
                        height="5"
                        rx="2.5"
                        fill="#6366f1"
                      />
                      <rect
                        x="70"
                        y="120"
                        width="60"
                        height="5"
                        rx="2.5"
                        fill="#6366f1"
                      />
                      <rect
                        x="80"
                        y="130"
                        width="40"
                        height="5"
                        rx="2.5"
                        fill="#6366f1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    Schedule a Free Introduction
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Book a 15-minute call to discuss your goals, confirm fit, and
                    decide if you want to proceed with the mentorship
                    relationship.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 md:left-1/2 md:-top-8 md:transform md:-translate-x-1/2 bg-primary-100 rounded-full p-6 text-primary font-bold text-2xl">
                3
              </div>
              <Card className="h-full">
                <CardContent className="pt-10 pb-6 px-6 flex flex-col items-center text-center">
                  <div className="h-40 flex items-center justify-center">
                    <svg
                      className="w-32 h-32"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30,100 Q50,30 100,100 T170,100"
                        stroke="#6366f1"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle cx="30" cy="100" r="15" fill="#818cf8" />
                      <circle cx="100" cy="100" r="15" fill="#4f46e5" />
                      <circle cx="170" cy="100" r="15" fill="#4338ca" />
                      <rect
                        x="60"
                        y="130"
                        width="80"
                        height="40"
                        rx="5"
                        fill="#e0e7ff"
                      />
                      <path
                        d="M75,150 L85,160 L125,140"
                        stroke="#4f46e5"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    Start Your Mentorship
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Choose a subscription plan, get matched, and begin regular
                    1:1 sessions tailored to your specific goals and needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/browse-mentors">
              <Button size="lg">Find Your Mentor Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Benefits of Having a Mentor
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A mentor can dramatically accelerate your professional growth
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M13 6V21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H13ZM13 6H21V9M21 9V4C21 3.44772 20.5523 3 20 3H17C16.4477 3 16 3.44772 16 4V9M21 9H16M11 10H5V12H11V10ZM11 14H5V19H11V14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Personalized Guidance
              </h3>
              <p className="mt-2 text-gray-600">
                Get advice tailored specifically to your career goals, skills
                gaps, and learning style.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M9 6L20 6M20 6V17M20 6L4 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Accelerated Growth
              </h3>
              <p className="mt-2 text-gray-600">
                Learn from someone who's already navigated the path you're on,
                avoiding common pitfalls and fast-tracking your progress.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M3 10H21M3 10L7 14M3 10L7 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Expanded Network
              </h3>
              <p className="mt-2 text-gray-600">
                Access not just your mentor's knowledge, but potentially their
                professional network and industry connections.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Accountability
              </h3>
              <p className="mt-2 text-gray-600">
                Regular sessions with a mentor create a structure that helps you
                stay motivated and committed to your goals.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM5.29289 8.70711L11.2929 14.7071L12.7071 13.2929L6.70711 7.29289L5.29289 8.70711ZM12.7071 14.7071L18.7071 8.70711L17.2929 7.29289L11.2929 13.2929L12.7071 14.7071Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Objective Feedback
              </h3>
              <p className="mt-2 text-gray-600">
                Receive honest, constructive feedback from someone whose only
                interest is helping you succeed.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Industry Insights
              </h3>
              <p className="mt-2 text-gray-600">
                Gain insider knowledge about industry trends, company cultures,
                and hidden opportunities not visible from the outside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Transparent, Simple Pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose the plan that works best for your goals and budget
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`overflow-hidden ${
                  plan.recommended
                    ? "border-primary shadow-lg relative"
                    : "border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent
                  className={`p-6 ${plan.recommended ? "pt-9" : "pt-6"}`}
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/browse-mentors">
                      <Button
                        variant={plan.recommended ? "default" : "outline"}
                        className="w-full"
                      >
                        Find a Mentor
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center text-gray-500 text-sm">
            All plans include a 7-day money back guarantee if you're not
            satisfied with your first session
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Everything you need to know about our mentorship program
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <span className="text-left font-medium text-gray-900">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-0 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Still have questions?
            </h3>
            <p className="mt-2 text-gray-600 text-center max-w-md">
              If you have any other questions about how MentorMatch works, feel
              free to contact our support team.
            </p>
            <Button variant="outline" className="mt-6">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to accelerate your career?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Find a mentor who's been where you want to go. Get personalized
                  guidance, support, and accountability to reach your goals
                  faster.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/browse-mentors">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Find a Mentor
                    </Button>
                  </Link>
                  <Link href="/become-mentor">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-white border-white hover:bg-primary-800/60"
                    >
                      Become a Mentor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Users, DollarSign, Award } from "lucide-react";
import MentorApplyForm from "@/components/mentors/MentorApplyForm";

export default function BecomeMentor() {
  const benefits = [
    {
      title: "Share Your Expertise",
      description:
        "Make a meaningful impact by helping others grow in their careers while strengthening your own knowledge and skills.",
      icon: <Star className="h-6 w-6 text-primary" />,
    },
    {
      title: "Expand Your Network",
      description:
        "Connect with motivated professionals from diverse backgrounds and companies, creating valuable relationships.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Earn Additional Income",
      description:
        "Set your own rates and receive compensation for sharing your knowledge and experience with others.",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
    },
    {
      title: "Build Your Personal Brand",
      description:
        "Establish yourself as a thought leader in your field and enhance your professional reputation.",
      icon: <Award className="h-6 w-6 text-primary" />,
    },
  ];

  const requirements = [
    "Minimum 3+ years of professional experience in your field",
    "Strong communication skills and a passion for teaching",
    "Commitment to meeting with mentees regularly",
    "Ability to provide constructive feedback and guidance",
    "Willingness to share personal experiences and industry insights",
  ];

  const processes = [
    {
      number: 1,
      title: "Complete Application",
      description:
        "Fill out a detailed profile highlighting your expertise, experience, and what you can offer mentees.",
    },
    {
      number: 2,
      title: "Interview & Verification",
      description:
        "Have a short interview with our team where we verify your experience and discuss mentorship best practices.",
    },
    {
      number: 3,
      title: "Profile Approval",
      description:
        "Once approved, your profile will be listed in our mentor directory for potential mentees to discover.",
    },
    {
      number: 4,
      title: "Start Mentoring",
      description:
        "Connect with mentees, schedule sessions, and begin making an impact while earning additional income.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Become a Mentor - MentorMatch</title>
        <meta
          name="description"
          content="Share your expertise, build your personal brand, and earn additional income by becoming a mentor on MentorMatch."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Become a Mentor
              </h1>
              <p className="mt-6 text-xl text-primary-100 max-w-3xl">
                Share your expertise, build your personal brand, and earn
                additional income while helping others grow in their careers.
              </p>

              <div className="mt-8">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-primary-300" />
                      </div>
                      <p className="ml-3 text-base text-primary-100">
                        {requirement}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    const formElement = document.getElementById("apply-form");
                    if (formElement) {
                      formElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Apply Now
                </Button>
                <Link href="/browse-mentors">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-primary-800"
                  >
                    Browse Mentors
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="rounded-lg shadow-xl overflow-hidden">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 500 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="500" height="400" fill="#4338ca" />
                  <circle cx="250" cy="150" r="100" fill="#4f46e5" />
                  <circle cx="250" cy="150" r="70" fill="#6366f1" />
                  <circle cx="250" cy="150" r="40" fill="#818cf8" />
                  <circle cx="250" cy="150" r="20" fill="#a5b4fc" />

                  {/* Person 1 */}
                  <circle cx="150" cy="280" r="30" fill="#6366f1" />
                  <rect x="135" y="320" width="30" height="60" fill="#6366f1" />
                  <rect x="120" y="340" width="20" height="40" fill="#6366f1" />
                  <rect x="160" y="340" width="20" height="40" fill="#6366f1" />

                  {/* Person 2 */}
                  <circle cx="250" cy="280" r="30" fill="#a5b4fc" />
                  <rect x="235" y="320" width="30" height="60" fill="#a5b4fc" />
                  <rect x="220" y="340" width="20" height="40" fill="#a5b4fc" />
                  <rect x="260" y="340" width="20" height="40" fill="#a5b4fc" />

                  {/* Person 3 */}
                  <circle cx="350" cy="280" r="30" fill="#e0e7ff" />
                  <rect x="335" y="320" width="30" height="60" fill="#e0e7ff" />
                  <rect x="320" y="340" width="20" height="40" fill="#e0e7ff" />
                  <rect x="360" y="340" width="20" height="40" fill="#e0e7ff" />

                  {/* Connection lines */}
                  <line
                    x1="250"
                    y1="150"
                    x2="150"
                    y2="250"
                    stroke="#e0e7ff"
                    strokeWidth="3"
                  />
                  <line
                    x1="250"
                    y1="150"
                    x2="250"
                    y2="250"
                    stroke="#e0e7ff"
                    strokeWidth="3"
                  />
                  <line
                    x1="250"
                    y1="150"
                    x2="350"
                    y2="250"
                    stroke="#e0e7ff"
                    strokeWidth="3"
                  />

                  <text
                    x="250"
                    y="150"
                    fontFamily="Arial"
                    fontSize="20"
                    textAnchor="middle"
                    fill="white"
                    fontWeight="bold"
                  >
                    MENTOR
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Become a Mentor?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Mentoring isn't just about helping others—it's also a rewarding
              experience for you
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="bg-primary-50 p-4 rounded-lg">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The Application Process
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our simple 4-step process to becoming a mentor
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {processes.map((process) => (
                <div key={process.number} className="relative">
                  <div className="absolute -left-4 -top-4 md:left-1/2 md:-top-8 md:transform md:-translate-x-1/2 bg-primary-100 rounded-full p-6 text-primary font-bold text-2xl">
                    {process.number}
                  </div>
                  <div className="bg-white p-6 pt-10 rounded-lg shadow-sm border border-gray-200 h-full">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {process.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {process.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Mentors Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from professionals who are already mentoring on our platform
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#e0e7ff" />
                  <circle cx="24" cy="20" r="8" fill="#6366f1" />
                  <path
                    d="M10 40C10 33.373 16.268 28 24 28C31.732 28 38 33.373 38 40V44H10V40Z"
                    fill="#6366f1"
                  />
                </svg>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Michael Chen
                  </h3>
                  <p className="text-sm text-gray-600">
                    Engineering Manager at Amazon
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Mentoring has been an incredibly rewarding experience. Not only
                do I get to help others grow in their careers, but I've also
                improved my own leadership and communication skills. Plus, the
                extra income has been a nice bonus!"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#e0e7ff" />
                  <circle cx="24" cy="20" r="8" fill="#6366f1" />
                  <path
                    d="M10 40C10 33.373 16.268 28 24 28C31.732 28 38 33.373 38 40V44H10V40Z"
                    fill="#6366f1"
                  />
                </svg>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-gray-600">
                    Senior Developer at Microsoft
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "I was hesitant at first about whether I had enough experience to
                mentor others, but the platform made it easy to get started. My
                mentees have been amazing to work with, and seeing them succeed
                has been the most fulfilling part of my professional life."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#e0e7ff" />
                  <circle cx="24" cy="20" r="8" fill="#6366f1" />
                  <path
                    d="M10 40C10 33.373 16.268 28 24 28C31.732 28 38 33.373 38 40V44H10V40Z"
                    fill="#6366f1"
                  />
                </svg>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    James Wilson
                  </h3>
                  <p className="text-sm text-gray-600">
                    Product Manager at Google
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The flexibility of mentoring on this platform has been perfect
                for my busy schedule. I can set my own hours and rates, and the
                platform handles all the logistics. It's a great way to give back
                to the community while also advancing my own career."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Apply to Become a Mentor
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fill out the form below to start your application. Our team will
              review your information and reach out for the next steps.
            </p>
          </div>

          <MentorApplyForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  How much can I earn as a mentor?
                </h3>
                <p className="mt-2 text-gray-600">
                  Mentors set their own rates based on experience and expertise.
                  Typical rates range from $50-$200 per hour or $100-$400 per
                  month for subscription plans. MentorMatch takes a 15% platform
                  fee from each payment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  How much time do I need to commit?
                </h3>
                <p className="mt-2 text-gray-600">
                  You decide your own availability. Most mentors spend 2-5 hours
                  per week on the platform, but it's entirely up to you. You can
                  limit the number of mentees you work with at any given time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Do I need to be currently employed at a tech company?
                </h3>
                <p className="mt-2 text-gray-600">
                  No, but you need relevant professional experience in your
                  field. Freelancers, consultants, and entrepreneurs with
                  verifiable experience are welcome to apply.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  How does the payment process work?
                </h3>
                <p className="mt-2 text-gray-600">
                  Mentees pay through our secure platform. For hourly sessions,
                  payment is released after each completed session. For
                  subscription plans, payment is collected monthly and
                  distributed to mentors, minus the platform fee.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  What happens if I need to take a break?
                </h3>
                <p className="mt-2 text-gray-600">
                  You can pause your profile at any time if you need a break or
                  are too busy. You can specify "not accepting new mentees" while
                  still working with your current ones, or fully pause all
                  mentorship activities.
                </p>
              </div>
            </div>
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
                  <span className="block">Ready to make an impact?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Share your knowledge, grow your network, and earn additional
                  income by becoming a mentor today.
                </p>
                <div className="mt-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      const formElement =
                        document.getElementById("apply-form");
                      if (formElement) {
                        formElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

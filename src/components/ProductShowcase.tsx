import { motion } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    storage: "2 GB",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&q=80",
    features: [
      "2 GB of storage",
      "File sharing",
      "Basic security",
      "Mobile app access",
    ],
    href: "/signup",
  },
  {
    name: "Plus",
    price: "₹1,200/mo",
    storage: "2 TB",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    features: [
      "2 TB of storage",
      "Advanced sharing controls",
      "Priority support",
      "File recovery",
      "Offline access",
    ],
    href: "/signup",
    popular: true,
  },
  {
    name: "Professional",
    price: "₹2,000/mo",
    storage: "3 TB",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    features: [
      "3 TB of storage",
      "Advanced security",
      "Team collaboration",
      "Admin tools",
      "Unlimited file versioning",
      "Smart sync",
    ],
    href: "/signup",
  },
];

export function ProductShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Select the perfect storage plan for your needs. Upgrade or downgrade anytime.
        </p>
      </motion.div>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col rounded-2xl border ${
              plan.popular
                ? "border-primary shadow-lg ring-2 ring-primary/20"
                : "border-gray-200 dark:border-gray-800"
            } bg-white dark:bg-gray-900 p-8 hover:shadow-xl transition-all duration-300`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {plan.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {plan.storage} of storage
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link href={plan.href}>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Get Started
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Need more storage?{" "}
          <Link href="/enterprise" className="text-primary hover:underline font-semibold">
            View Enterprise plans
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
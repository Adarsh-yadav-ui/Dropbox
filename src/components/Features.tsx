import { motion } from "motion/react";
import { Gem, ShieldCheck, Truck, Tag, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Premium Materials",
    description: "Our shoes are crafted from the finest materials to ensure durability and comfort.",
  },
  {
    icon: ShieldCheck,
    title: "Durable & Long-lasting",
    description: "Built to last, our shoes can withstand the test of time and daily wear.",
  },
  {
    icon: Truck,
    title: "Free & Fast Shipping",
    description: "Get your new shoes delivered to your doorstep in no time, free of charge.",
  },
  {
    icon: Tag,
    title: "Affordable Prices",
    description: "We offer competitive prices without compromising on quality.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every pair of shoes is made with passion and attention to detail.",
  },
  {
    icon: Star,
    title: "Top-rated by Customers",
    description: "Our customers love our shoes, and we're sure you will too!",
  },
];

export function Features() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 lg:px-8">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl mb-4"
          style={{ fontWeight: 600 }}
        >
          Why Choose Our Shoes?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We provide the best shoes with the best quality and at the best prices.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2" style={{ fontWeight: 600 }}>
              {feature.title}
            </h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <div className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-linear-to-b from-muted/50 to-background border border-border">
          <h3 className="text-3xl" style={{ fontWeight: 600 }}>
            Ready to find your perfect pair?
          </h3>
          <p className="text-muted-foreground max-w-md">
            Browse our collection and find the shoes that are right for you.
          </p>
          <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Shop Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
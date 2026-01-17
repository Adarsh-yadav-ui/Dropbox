import { motion } from "motion/react";
import { Cloud, Lock, Users, Zap, FolderSync, Shield } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Store all your files securely in the cloud and access them from anywhere, anytime.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description: "Your files are encrypted and protected with industry-leading security measures.",
  },
  {
    icon: Users,
    title: "Easy Sharing",
    description: "Share files and folders publicly or privately with just a few clicks.",
  },
  {
    icon: Zap,
    title: "Fast Upload & Sync",
    description: "Lightning-fast file uploads and automatic syncing across all your devices.",
  },
  {
    icon: FolderSync,
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time with seamless file collaboration.",
  },
  {
    icon: Shield,
    title: "Reliable Backup",
    description: "Never lose your important files with automatic backup and version history.",
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
          Why Choose Dropbox?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Everything you need to store, share, and collaborate on your files in one place.
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
            Ready to get started?
          </h3>
          <p className="text-muted-foreground max-w-md">
            Start uploading and sharing your files today. It's free to get started!
          </p>
          <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign Up Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Running Shoes",
    price: "₹18 000",
    image:
      "https://static.nike.com/a/images/t_default/f7bcfc63-7709-4f49-80bd-344b0441ebeb/NIKE+VOMERO+PREMIUM.png",
    href: "/dashboard",
  },
  {
    name: "Casual Sneakers",
    price: "₹14 000",
    image:
      "https://static.nike.com/a/images/t_default/1cbcc3f2-2ea4-4a9c-a1f0-74c661d9f3c9/NIKE+SHOX+RIDE+2.png",
    href: "/dashboard",
  },

  {
    name: "Formal Shoes",
    price: "₹8665",
    image:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/h_381,c_limit/201aa025-8557-439f-9f29-919088286ce4/air-max-fire-shoes-93FzG1m5.png",
    href: "/dashboard",
  },
];

export function ProductShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Featured Products
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Check out our latest and greatest shoe models.
        </p>
      </motion.div>
      <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 dark:text-gray-200">
                  <Link href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
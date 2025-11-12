import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FEATURED } from "@/features/home/constant/featuredProduct";

export const FeaturedProduct = () => {
  return (
    <section className="py-20 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED.map((product) => (
            <Link
              key={product.id}
              href="/product"
              className="group relative bg-secondary border border-border hover:border-foreground transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-foreground text-background px-4 py-2 text-xs font-bold tracking-wide">
                  {product.tag}
                </span>
              </div>
              <div className="p-8 space-y-2">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-xl font-medium text-muted-foreground">
                  Starting from {product.price}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

import { CATEGORIES } from "@/features/home/constant/categoriesProduct";

export const CategoriesProduct = () => {
  return (
    <section id="smartphones" className="py-20 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase()}`}
              className="group bg-secondary border border-border hover:border-foreground transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 lg:p-6 space-y-1">
                <h3 className="text-lg lg:text-xl font-bold">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

import { BadgeDollarSign, HandHeart, Star, Truck } from "lucide-react";

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why TryWear</h2>
            <p className="text-lg text-muted-foreground">
              Your trusted partner in premium electronics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-8">
            {[
              {
                title: "Premium Quality",
                icon: BadgeDollarSign,
                desc: "Only authentic products from trusted brands",
              },
              {
                title: "Fast Delivery",
                icon: Truck,
                desc: "Free shipping on orders over Rp 1.000.000",
              },
              {
                title: "Expert Support",
                icon: HandHeart,
                desc: "24/7 customer service ready to help",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

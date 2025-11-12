import { Button } from "@repo/ui/components/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-base font-semibold max-sm:w-full"
            asChild
          >
            <Link href="/shop">
              Start Shopping
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

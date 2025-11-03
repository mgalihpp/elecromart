import { Button } from "@repo/ui/components/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-secondary border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            The Future of
            <br />
            Technology
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience innovation at its finest. Discover premium electronics
            designed for those who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-semibold hover:bg-background border-2 border-foreground hover:text-foreground max-sm:w-full"
              asChild
            >
              <Link href="/shop">
                Belanja Sekarang
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-2 border-foreground hover:bg-foreground hover:text-background max-sm:w-full"
            >
              Jelajahi Produk
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

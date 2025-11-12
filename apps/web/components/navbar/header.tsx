import { Button } from "@repo/ui/components/button";
import { Heart, Search, User } from "lucide-react";
import Link from "next/link";
import CartSheet from "@/features/cart/components/cart-sheet";
import MobileMenu from "./mobile-menu";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <MobileMenu />

            <Link href="/" className="flex items-center">
              <span className="hidden sm:block text-2xl font-bold tracking-tight">
                TryWear
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/search"
                className="text-sm font-medium hover:opacity-60 transition-opacity"
              >
                Smartphones
              </Link>
              <Link
                href="/search"
                className="text-sm font-medium hover:opacity-60 transition-opacity"
              >
                Laphrefps
              </Link>
              <Link
                href="/search"
                className="text-sm font-medium hover:opacity-60 transition-opacity"
              >
                Audio
              </Link>
              <Link
                href="/search"
                className="text-sm font-medium hover:opacity-60 transition-opacity"
              >
                Wearables
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <Link href="/settings">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

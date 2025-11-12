"use client";

import { Button } from "@repo/ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Smartphones", href: "#smartphones" },
    { label: "Laptops", href: "#laptops" },
    { label: "Audio", href: "#audio" },
    { label: "Wearables", href: "#wearables" },
    { label: "Accessories", href: "#accessories" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" hideClose className="w-full p-0 border-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold">TryWear</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-medium hover:opacity-60 transition-opacity block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-border space-y-4">
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setOpen(false)}
            >
              Masuk
            </Button>
            <Button className="w-full h-12" onClick={() => setOpen(false)}>
              Daftar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

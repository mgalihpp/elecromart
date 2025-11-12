"use client";

import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Bell } from "lucide-react";
import { SearchCommand } from "@/components/search-command";
import { Breadcrumb } from "./breadcrumb";

export function TopNav() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 gap-4 w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <SearchCommand />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Bell className="w-5 h-5 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3 py-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-muted-foreground">
                  Order #12345 from John Doe
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 py-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Payment confirmed</p>
                <p className="text-xs text-muted-foreground">
                  Payment for order #12344 confirmed
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 py-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-muted-foreground">
                  Product SKU-001 is running low
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-xs text-muted-foreground py-2">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

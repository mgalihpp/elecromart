"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { AlertTriangle, Package, TrendingDown } from "lucide-react";

const stats = [
  { title: "Total SKUs", value: "234", icon: Package, color: "text-blue-600" },
  {
    title: "Low Stock Items",
    value: "12",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    title: "Out of Stock",
    value: "3",
    icon: TrendingDown,
    color: "text-destructive",
  },
];

export function InventoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

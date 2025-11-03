"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

const topProducts = [
  { id: 1, name: "Premium Watch", sales: 234, revenue: "$12,450" },
  { id: 2, name: "Smart Band", sales: 189, revenue: "$9,870" },
  { id: 3, name: "Wireless Earbuds", sales: 156, revenue: "$8,340" },
  { id: 4, name: "Fitness Tracker", sales: 142, revenue: "$7,210" },
];

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product.sales} sales
                </p>
              </div>
              <p className="font-semibold text-sm">{product.revenue}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

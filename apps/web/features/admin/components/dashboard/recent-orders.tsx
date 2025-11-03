"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    amount: "$234.50",
    status: "Delivered",
    date: "2025-01-20",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    amount: "$567.80",
    status: "Shipped",
    date: "2025-01-19",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    amount: "$123.45",
    status: "Processing",
    date: "2025-01-18",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    amount: "$890.12",
    status: "Pending",
    date: "2025-01-17",
  },
];

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Pending: "bg-gray-100 text-gray-800",
};

export function RecentOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium text-sm">{order.id}</p>
                <p className="text-xs text-muted-foreground">
                  {order.customer}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{order.amount}</p>
                <Badge
                  className={
                    statusColors[order.status as keyof typeof statusColors]
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { status: "Pending", count: 45 },
  { status: "Processing", count: 32 },
  { status: "Shipped", count: 78 },
  { status: "Delivered", count: 156 },
  { status: "Returned", count: 12 },
];

export function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--color-chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

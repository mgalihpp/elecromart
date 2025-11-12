"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DataTable } from "@/features/admin/components/data-table";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Delivered" | "Shipped" | "Processing" | "Pending";
  items: number;
}

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-01-20",
    amount: "$234.50",
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2025-01-19",
    amount: "$567.80",
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    date: "2025-01-18",
    amount: "$123.45",
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    date: "2025-01-17",
    amount: "$890.12",
    status: "Pending",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    date: "2025-01-16",
    amount: "$456.78",
    status: "Delivered",
    items: 2,
  },
];

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Pending: "bg-gray-100 text-gray-800",
};

export function OrdersTable() {
  const [orders_list, setOrders] = useState<Order[]>(orders);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "items",
      header: "Items",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/orders/${order.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Truck className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={orders_list}
          searchPlaceholder="Search by order ID or customer..."
          searchKey="id"
        />
      </CardContent>
    </Card>
  );
}

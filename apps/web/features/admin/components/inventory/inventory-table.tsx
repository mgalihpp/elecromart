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
import { AlertTriangle, Edit2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DataTable } from "../data-table";

interface InventoryItem {
  sku: string;
  product: string;
  stock: number;
  reserved: number;
  safety: number;
  status: "Optimal" | "Low" | "Out";
}

const inventory: InventoryItem[] = [
  {
    sku: "MW-001",
    product: "Premium Watch",
    stock: 45,
    reserved: 5,
    safety: 10,
    status: "Optimal",
  },
  {
    sku: "MW-002",
    product: "Smart Band",
    stock: 8,
    reserved: 2,
    safety: 10,
    status: "Low",
  },
  {
    sku: "MW-003",
    product: "Wireless Earbuds",
    stock: 0,
    reserved: 0,
    safety: 15,
    status: "Out",
  },
  {
    sku: "MW-004",
    product: "Fitness Tracker",
    stock: 18,
    reserved: 3,
    safety: 10,
    status: "Optimal",
  },
  {
    sku: "MW-005",
    product: "Phone Case",
    stock: 156,
    reserved: 20,
    safety: 20,
    status: "Optimal",
  },
];

const statusColors = {
  Optimal: "bg-emerald-100 text-emerald-800",
  Low: "bg-orange-100 text-orange-800",
  Out: "bg-destructive/10 text-destructive",
};

export function InventoryTable() {
  const [inventory_list, setInventory] = useState<InventoryItem[]>(inventory);

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "reserved",
      header: "Reserved",
    },
    {
      accessorKey: "safety",
      header: "Safety Stock",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-2">
            {status !== "Optimal" && (
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            )}
            <Badge
              className={statusColors[status as keyof typeof statusColors]}
            >
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Link href={`/dashboard/inventory/${item.sku}`}>
            <Button variant="ghost" size="sm">
              <Edit2 className="w-4 h-4" />
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={inventory_list}
          searchPlaceholder="Search by SKU or product..."
          searchKey="sku"
        />
      </CardContent>
    </Card>
  );
}

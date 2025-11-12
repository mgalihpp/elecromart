"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "@/features/admin/components/data-table";

interface Variant {
  id: number;
  name: string;
  sku: string;
  product: string;
  price: string;
  stock: number;
  status: "active" | "inactive";
}

const variants: Variant[] = [
  {
    id: 1,
    name: "Black - 42mm",
    sku: "MW-001-BK-42",
    product: "Premium Watch",
    price: "$299.99",
    stock: 25,
    status: "active",
  },
  {
    id: 2,
    name: "Silver - 42mm",
    sku: "MW-001-SV-42",
    product: "Premium Watch",
    price: "$299.99",
    stock: 20,
    status: "active",
  },
  {
    id: 3,
    name: "Black - 38mm",
    sku: "MW-001-BK-38",
    product: "Premium Watch",
    price: "$279.99",
    stock: 0,
    status: "inactive",
  },
  {
    id: 4,
    name: "Red - M",
    sku: "MW-002-RD-M",
    product: "Smart Band",
    price: "$149.99",
    stock: 15,
    status: "active",
  },
  {
    id: 5,
    name: "Blue - L",
    sku: "MW-002-BL-L",
    product: "Smart Band",
    price: "$149.99",
    stock: 17,
    status: "active",
  },
];

export function VariantsTable() {
  const router = useRouter();
  const [variants_list, setVariants] = useState<Variant[]>(variants);

  const handleDelete = (id: number) => {
    setVariants(variants_list.filter((v) => v.id !== id));
  };

  const columns: ColumnDef<Variant>[] = [
    {
      accessorKey: "name",
      header: "Variant Name",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return (
          <span className={stock === 0 ? "text-destructive font-medium" : ""}>
            {stock}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const variant = row.original;
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/variants/${variant.id}/edit`}>
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => handleDelete(variant.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Variants</h3>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={variants_list}
          searchPlaceholder="Search by name or SKU..."
          searchKey="name"
        />
      </CardContent>
    </Card>
  );
}

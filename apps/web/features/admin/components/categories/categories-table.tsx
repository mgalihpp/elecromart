"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DataTable } from "@/features/admin/components/data-table";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productsCount: number;
  image: string;
  status: "active" | "inactive";
  createdAt: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Casual and comfortable t-shirts",
    productsCount: 156,
    image: "/plain-white-tshirt.png",
    status: "active",
    createdAt: "2023-01-10",
  },
  {
    id: 2,
    name: "Hoodies",
    slug: "hoodies",
    description: "Warm and cozy hoodies",
    productsCount: 89,
    image: "/cozy-hoodie.png",
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: 3,
    name: "Jackets",
    slug: "jackets",
    description: "Stylish jackets for all seasons",
    productsCount: 67,
    image: "/stylish-woman-leather-jacket.png",
    status: "active",
    createdAt: "2023-02-01",
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    description: "Hats, scarves, and more",
    productsCount: 234,
    image: "/fashion-accessories-flatlay.png",
    status: "inactive",
    createdAt: "2023-02-10",
  },
];

export function CategoriesTable() {
  const [categories, setCategories] = useState(mockCategories);
  const handleDelete = (id: number) => {
    setCategories(categories.filter((p) => p.id !== id));
  };
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "productsCount",
      header: "Product Count",
    },
    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "active" ? "default" : "secondary"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/categories/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-destructive hover:text-destructive"
            onClick={() => handleDelete(Number(row.id))}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Categories</h3>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={categories}
          searchPlaceholder="Search by name"
          searchKey="name"
        />
      </CardContent>
    </Card>
  );
}

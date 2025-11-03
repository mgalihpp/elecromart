"use client";

import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoriesTable } from "@/features/admin/components/categories/categories-table";

export default function CategoriesPage() {
  return (
    <div className="p-0 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage product categories
          </p>
        </div>
        <Link href="/dashboard/categories/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <CategoriesTable />
    </div>
  );
}

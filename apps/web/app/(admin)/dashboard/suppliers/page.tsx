"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SuppliersTable } from "@/features/admin/components/suppliers/suppliers-table";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: "active" | "inactive";
  productsCount: number;
  joinDate: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Premium Textiles Co.",
    email: "contact@premiumtextiles.com",
    phone: "+1-555-0101",
    address: "123 Fabric Lane",
    city: "New York",
    country: "USA",
    status: "active",
    productsCount: 45,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Global Fabrics Ltd.",
    email: "sales@globalfabrics.com",
    phone: "+44-20-7946-0958",
    address: "456 Textile Street",
    city: "London",
    country: "UK",
    status: "active",
    productsCount: 32,
    joinDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Asian Textiles Group",
    email: "info@asiantextiles.com",
    phone: "+86-10-1234-5678",
    address: "789 Silk Road",
    city: "Shanghai",
    country: "China",
    status: "inactive",
    productsCount: 28,
    joinDate: "2023-05-10",
  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-0 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground mt-2">
            Manage your supplier network and relationships
          </p>
        </div>
        <Link href="/admin/suppliers/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Suppliers</CardTitle>
          <CardDescription>Total: {suppliers.length} suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <SuppliersTable data={suppliers} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Delete Supplier</CardTitle>
              <CardDescription>
                Are you sure you want to delete this supplier?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

"use client";

import type { Product } from "@repo/db";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorAlert } from "@/features/admin/components//error-alert";
import { DataTable } from "@/features/admin/components/data-table";
import { DataTableSkeleton } from "@/features/admin/components/data-table-skeleton";
import { api } from "@/lib/api";
import { formatCurrency } from "@/features/admin/utils";

export function ProductsTable() {
  const router = useRouter();

  const {
    data: productsData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: api.product.getAll,
  });

  // const handleDelete = (id: number) => {
  //   setProducts(products_list.filter((p) => p.id !== id));
  // };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Nama Produk",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    // {
    //   accessorKey: "category",
    //   header: "Category",
    // },
    {
      accessorKey: "price_cents",
      header: "Harga",
      cell: ({ row }) => {
        const price_cents = row.getValue("price_cents") as number;

        return <span>{formatCurrency(price_cents)}</span>;
      },
    },
    // {
    //   accessorKey: "stock",
    //   header: "Stock",
    //   cell: ({ row }) => {
    //     const stock = row.getValue("stock") as number;
    //     return (
    //       <span className={stock === 0 ? "text-destructive font-medium" : ""}>
    //         {stock}
    //       </span>
    //     );
    //   },
    // },
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
      header: "Aksi",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              // onClick={() => handleDelete(product.id)}
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
        <h3 className="text-lg font-semibold">Produk</h3>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <DataTableSkeleton />
        ) : isError ? (
          <ErrorAlert
            description="Gagal mendapatkan data produk"
            action={() => refetch()}
          />
        ) : (
          <DataTable
            columns={columns}
            data={productsData}
            searchPlaceholder="Cari berdasarkan nama produk or SKU..."
            searchKey="title"
          />
        )}
      </CardContent>
    </Card>
  );
}

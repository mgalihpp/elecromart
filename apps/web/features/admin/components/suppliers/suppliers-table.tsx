"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "../data-table";

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

interface SuppliersTableProps {
  data: Supplier[];
  onDelete: (id: string) => void;
}

export function SuppliersTable({ data, onDelete }: SuppliersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Supplier>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Supplier Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "productsCount",
        header: "Product Count",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/suppliers/${row.original.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => onDelete(row.original.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
  });

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Suppliers</h3>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder="Search by supplier name"
          searchKey="name"
        />
      </CardContent>
    </Card>
  );
}

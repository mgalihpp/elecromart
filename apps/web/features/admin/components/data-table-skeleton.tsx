/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function DataTableSkeleton({
  columns = 5,
  rows = 5,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Search + Column button skeleton */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

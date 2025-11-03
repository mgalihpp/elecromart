import { OrdersTable } from "@/features/admin/components/orders/orders-table";

export default function OrdersPage() {
  return (
    <div className="p-0 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage all customer orders
        </p>
      </div>

      <OrdersTable />
    </div>
  );
}

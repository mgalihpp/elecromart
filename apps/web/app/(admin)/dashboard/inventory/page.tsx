import { InventoryStats } from "@/features/admin/components/inventory/inventory-stats";
import { InventoryTable } from "@/features/admin/components/inventory/inventory-table";

export default function InventoryPage() {
  return (
    <div className="p-0 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Inventory Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor stock levels and manage inventory
        </p>
      </div>

      <InventoryStats />
      <InventoryTable />
    </div>
  );
}

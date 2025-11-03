import { OrdersChart } from "@/features/admin/components/dashboard/orders-chart";
import { DashboardOverview } from "@/features/admin/components/dashboard/overview";
import { RecentOrders } from "@/features/admin/components/dashboard/recent-orders";
import { RevenueChart } from "@/features/admin/components/dashboard/revenue-chart";
import { TopProducts } from "@/features/admin/components/dashboard/top-product";

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your business overview.
        </p>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <OrdersChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}

"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  // --- DASHBOARD
  "/dashboard": [{ label: "Dashboard" }],

  // --- 1. PRODUCTS
  "/dashboard/products": [{ label: "Products" }],
  "/dashboard/products/new": [
    { label: "Products", href: "/products" },
    { label: "Add Product" },
  ],
  "/dashboard/products/edit": [
    { label: "Products", href: "/products" },
    { label: "Add Product" },
  ],
  "/dashboard/products/variants": [
    { label: "Products", href: "/products" },
    { label: "Variants" },
  ],
  "/dashboard/products/collections": [
    { label: "Products", href: "/products" },
    { label: "Collections" },
  ],
  "/dashboard/products/archived": [
    { label: "Products", href: "/products" },
    { label: "Archived" },
  ],

  // --- 2. ORDERS
  "/dashboard/orders": [{ label: "Orders" }],
  "/dashboard/orders/pending": [
    { label: "Orders", href: "/orders" },
    { label: "Pending" },
  ],
  "/dashboard/orders/processing": [
    { label: "Orders", href: "/orders" },
    { label: "Processing" },
  ],
  "/dashboard/orders/shipped": [
    { label: "Orders", href: "/orders" },
    { label: "Shipped" },
  ],
  "/dashboard/orders/completed": [
    { label: "Orders", href: "/orders" },
    { label: "Completed" },
  ],
  "/dashboard/orders/cancelled": [
    { label: "Orders", href: "/orders" },
    { label: "Cancelled" },
  ],

  // --- 3. CUSTOMERS
  "/dashboard/customers": [{ label: "Customers" }],
  "/dashboard/customers/segments": [
    { label: "Customers", href: "/customers" },
    { label: "Segments" },
  ],
  "/dashboard/customers/loyalty": [
    { label: "Customers", href: "/customers" },
    { label: "Loyalty Program" },
  ],
  "/dashboard/customers/blacklist": [
    { label: "Customers", href: "/customers" },
    { label: "Blacklist" },
  ],

  // --- 4. INVENTORY
  "/dashboard/inventory": [{ label: "Inventory" }], // Stock Overview
  "/dashboard/inventory/movements": [
    { label: "Inventory", href: "/inventory" },
    { label: "Stock Movements" },
  ],
  "/dashboard/inventory/warehouses": [
    { label: "Inventory", href: "/inventory" },
    { label: "Warehouses" },
  ],
  "/dashboard/inventory/adjustments": [
    { label: "Inventory", href: "/inventory" },
    { label: "Adjustments" },
  ],

  // --- 5. SUPPLIERS
  "/dashboard/suppliers": [{ label: "Suppliers" }],
  "/dashboard/suppliers/new": [
    { label: "Suppliers", href: "/suppliers" },
    { label: "Create Supplier" }, // Mengikuti pola `/new`
  ],
  "/dashboard/suppliers/orders": [
    { label: "Suppliers", href: "/suppliers" },
    { label: "Purchase Orders" },
  ],
  "/dashboard/suppliers/payments": [
    { label: "Suppliers", href: "/suppliers" },
    { label: "Payments" },
  ],

  // --- 6. CATEGORIES
  "/dashboard/categories": [{ label: "Categories" }],
  "/dashboard/categories/new": [
    { label: "Categories", href: "/categories" },
    { label: "Create Category" }, // Mengikuti pola `/new`
  ],
  "/dashboard/categories/sub": [
    { label: "Categories", href: "/categories" },
    { label: "Subcategories" },
  ],
  "/dashboard/categories/attributes": [
    { label: "Categories", href: "/categories" },
    { label: "Attributes" },
  ],

  // --- 7. COUPONS
  "/dashboard/coupons": [{ label: "Coupons" }],
  "/dashboard/coupons/new": [
    { label: "Coupons", href: "/coupons" },
    { label: "Create Coupon" },
  ],
  "/dashboard/coupons/expired": [
    { label: "Coupons", href: "/coupons" },
    { label: "Expired" },
  ],

  // --- 8. RETURNS
  "/dashboard/returns": [{ label: "Returns" }],
  "/dashboard/returns/requests": [
    { label: "Returns", href: "/returns" },
    { label: "Return Requests" },
  ],
  "/dashboard/returns/approved": [
    { label: "Returns", href: "/returns" },
    { label: "Approved" },
  ],
  "/dashboard/returns/rejected": [
    { label: "Returns", href: "/returns" },
    { label: "Rejected" },
  ],

  // --- 9. REVIEWS
  "/dashboard/reviews": [{ label: "Reviews" }],
  "/dashboard/reviews/pending": [
    { label: "Reviews", href: "/reviews" },
    { label: "Pending Approval" },
  ],
  "/dashboard/reviews/reported": [
    { label: "Reviews", href: "/reviews" },
    { label: "Reported" },
  ],

  // --- 10. ANALYTICS
  "/dashboard/analytics": [{ label: "Analytics" }],
  "/dashboard/analytics/sales": [
    { label: "Analytics", href: "/analytics" },
    { label: "Sales Overview" },
  ],
  "/dashboard/analytics/customers": [
    { label: "Analytics", href: "/analytics" },
    { label: "Customer Insights" },
  ],
  "/analytics/products": [
    { label: "Analytics", href: "/analytics" },
    { label: "Product Performance" },
  ],

  // --- 11. REPORTS
  "/dashboard/reports": [{ label: "Reports" }],
  "/dashboard/reports/daily": [
    { label: "Reports", href: "/reports" },
    { label: "Daily Reports" },
  ],
  "/dashboard/reports/monthly": [
    { label: "Reports", href: "/reports" },
    { label: "Monthly Reports" },
  ],
  "/dashboard/reports/custom": [
    { label: "Reports", href: "/reports" },
    { label: "Custom Report" },
  ],

  // --- 12. AUDIT LOGS
  "/dashboard/audit": [{ label: "Audit Logs" }], // All Logs
  "/dashboard/audit/users": [
    { label: "Audit Logs", href: "/audit" },
    { label: "User Activity" },
  ],
  "/dashboard/audit/system": [
    { label: "Audit Logs", href: "/audit" },
    { label: "System Events" },
  ],

  // --- 13. SETTINGS
  "/dashboard/settings": [{ label: "Settings" }], // General
  "/dashboard/settings/general": [
    { label: "Settings", href: "/settings" },
    { label: "General" },
  ],
  "/dashboard/settings/payment": [
    { label: "Settings", href: "/settings" },
    { label: "Payment" },
  ],
  "/dashboard/settings/shipping": [
    { label: "Settings", href: "/settings" },
    { label: "Shipping" },
  ],
  "/dashboard/settings/email": [
    { label: "Settings", href: "/settings" },
    { label: "Email Templates" },
  ],
  "/dashboard/settings/roles": [
    { label: "Settings", href: "/settings" },
    { label: "Roles & Permissions" },
  ],
};

export function Breadcrumb() {
  const pathname = usePathname();

  // Get breadcrumb items for current path
  let items = breadcrumbMap[pathname];

  // Handle dynamic routes like /products/[id], /orders/[id]/edit, etc.
  if (!items) {
    // --- 1. Products: Menangani /products/[id] dan /products/[id]/edit
    if (pathname.includes("/products/") && pathname.includes("/edit")) {
      items = [
        { label: "Products", href: "/products" },
        { label: "Edit Product" },
      ];
    } else if (pathname.match(/^\/products\/[^/]+$/)) {
      // Contoh: /products/123
      items = [
        { label: "Products", href: "/products" },
        { label: "Product Details" },
      ];
    }

    // --- 2. Orders: Menangani /orders/[id]
    else if (
      pathname.includes("/orders/") &&
      !pathname.includes("/new") &&
      !pathname.includes("/processing") &&
      !pathname.includes("/shipped") &&
      !pathname.includes("/completed") &&
      !pathname.includes("/cancelled")
    ) {
      items = [
        { label: "Orders", href: "/orders" },
        { label: "Order Details" },
      ];
    }

    // --- 3. Customers: Menangani /customers/[id]
    else if (
      pathname.includes("/customers/") &&
      !pathname.includes("/segments") &&
      !pathname.includes("/loyalty") &&
      !pathname.includes("/blacklist")
    ) {
      items = [
        { label: "Customers", href: "/customers" },
        { label: "Customer Details" },
      ];
    }

    // --- 4. Inventory: Menangani /inventory/[id] (Jika ada detail item inventaris)
    else if (
      pathname.includes("/inventory/") &&
      !pathname.includes("/movements") &&
      !pathname.includes("/warehouses") &&
      !pathname.includes("/adjustments")
    ) {
      items = [
        { label: "Inventory", href: "/inventory" },
        { label: "Stock Item Details" }, // Lebih spesifik dari "Inventory Details"
      ];
    }

    // --- 5. Suppliers: Menangani /suppliers/[id]
    else if (
      pathname.includes("/suppliers/") &&
      !pathname.includes("/orders") &&
      !pathname.includes("/payments") &&
      !pathname.includes("/new")
    ) {
      items = [
        { label: "Suppliers", href: "/suppliers" },
        { label: "Supplier Details" },
      ];
    }

    // --- 6. Categories: Menangani /categories/[id]
    else if (
      pathname.includes("/categories/") &&
      !pathname.includes("/sub") &&
      !pathname.includes("/attributes") &&
      !pathname.includes("/new")
    ) {
      items = [
        { label: "Categories", href: "/categories" },
        { label: "Category Details" },
      ];
    }

    // --- 7. Coupons: Menangani /coupons/[id]
    else if (
      pathname.includes("/coupons/") &&
      !pathname.includes("/new") &&
      !pathname.includes("/expired")
    ) {
      items = [
        { label: "Coupons", href: "/coupons" },
        { label: "Coupon Details" },
      ];
    }

    // --- 8. Returns: Menangani /returns/[id]
    else if (
      pathname.includes("/returns/") &&
      !pathname.includes("/requests") &&
      !pathname.includes("/approved") &&
      !pathname.includes("/rejected")
    ) {
      items = [
        { label: "Returns", href: "/returns" },
        { label: "Return Details" },
      ];
    }

    // Tambahan: /reviews/[id]
    else if (
      pathname.includes("/reviews/") &&
      !pathname.includes("/pending") &&
      !pathname.includes("/reported")
    ) {
      items = [
        { label: "Reviews", href: "/reviews" },
        { label: "Review Details" },
      ];
    }

    // Jika tidak ada yang cocok, gunakan Dashboard sebagai fallback
    else {
      items = [{ label: "Dashboard" }];
    }
  }

  return (
    <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-background/50">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link
              href={`/dashboard${item.href}`}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

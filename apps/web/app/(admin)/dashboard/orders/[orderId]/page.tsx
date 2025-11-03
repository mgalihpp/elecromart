"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { ArrowLeft, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock order data
const mockOrder = {
  id: "ORD-001",
  customer: "John Doe",
  email: "john@example.com",
  phone: "+1-234-567-8900",
  date: "2025-01-20",
  amount: "234.50",
  status: "Delivered",
  items: [
    { id: 1, name: "Premium Watch", quantity: 1, price: "299.99" },
    { id: 2, name: "Smart Band", quantity: 1, price: "149.99" },
  ],
  shippingAddress: "123 Main St, New York, NY 10001",
  trackingNumber: "TRK-123456789",
  shippingMethod: "Express",
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState(mockOrder);
  const [newStatus, setNewStatus] = useState(order.status);

  const statusColors = {
    Delivered: "bg-emerald-100 text-emerald-800",
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Pending: "bg-gray-100 text-gray-800",
  };

  const handleStatusUpdate = () => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    console.log("[v0] Order status updated:", newStatus);
  };

  return (
    <div className="p-0 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Order {order.id}</h1>
        <p className="text-muted-foreground mt-2">
          View and manage order details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current Status
                  </p>
                  <Badge
                    className={
                      statusColors[order.status as keyof typeof statusColors]
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="block text-sm font-medium">
                  Update Status
                </Label>
                <div className="flex gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <Button onClick={handleStatusUpdate}>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.amount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Shipping Address
                </p>
                <p className="font-medium">{order.shippingAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Shipping Method
                  </p>
                  <p className="font-medium">{order.shippingMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tracking Number
                  </p>
                  <p className="font-medium">{order.trackingNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-sm break-all">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.amount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Print Label
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Send Notification
              </Button>
              <Link href="/dashboard/orders" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Back to Orders
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

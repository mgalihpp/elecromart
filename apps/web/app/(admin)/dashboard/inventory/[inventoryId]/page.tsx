"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

// Mock inventory data
const mockInventory = {
  id: 1,
  productName: "Premium Watch",
  sku: "MW-001",
  currentStock: 45,
  reserved: 5,
  available: 40,
  reorderLevel: 20,
  reorderQuantity: 50,
  supplier: "Tech Supplies Inc",
  lastRestocked: "2025-01-15",
  location: "Warehouse A - Shelf 3",
};

export default function InventoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [inventory, setInventory] = useState(mockInventory);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentStock: inventory.currentStock.toString(),
    reserved: inventory.reserved.toString(),
    reorderLevel: inventory.reorderLevel.toString(),
    reorderQuantity: inventory.reorderQuantity.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = {
      ...inventory,
      currentStock: Number.parseInt(formData.currentStock),
      reserved: Number.parseInt(formData.reserved),
      available:
        Number.parseInt(formData.currentStock) -
        Number.parseInt(formData.reserved),
      reorderLevel: Number.parseInt(formData.reorderLevel),
      reorderQuantity: Number.parseInt(formData.reorderQuantity),
    };
    setInventory(updated);
    setIsEditing(false);
    console.log("[v0] Inventory updated:", updated);
  };

  const needsReorder = inventory.available <= inventory.reorderLevel;

  return (
    <div className="p-0 md:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/inventory">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {inventory.productName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage inventory levels and stock
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stock Levels */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Stock Levels</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">
                        Current Stock
                      </Label>
                      <Input
                        name="currentStock"
                        type="number"
                        value={formData.currentStock}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">
                        Reserved
                      </Label>
                      <Input
                        name="reserved"
                        type="number"
                        value={formData.reserved}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">
                        Reorder Level
                      </Label>
                      <Input
                        name="reorderLevel"
                        type="number"
                        value={formData.reorderLevel}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">
                        Reorder Quantity
                      </Label>
                      <Input
                        name="reorderQuantity"
                        type="number"
                        value={formData.reorderQuantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Current Stock
                    </p>
                    <p className="text-2xl font-bold">
                      {inventory.currentStock}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Reserved</p>
                    <p className="text-2xl font-bold">{inventory.reserved}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {inventory.available}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Reorder Level
                    </p>
                    <p className="text-2xl font-bold">
                      {inventory.reorderLevel}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reorder Information */}
          <Card>
            <CardHeader>
              <CardTitle>Reorder Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Supplier</p>
                <p className="font-medium">{inventory.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Reorder Quantity
                </p>
                <p className="font-medium">{inventory.reorderQuantity} units</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Restocked</p>
                <p className="font-medium">{inventory.lastRestocked}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Warehouse Location
                </p>
                <p className="font-medium">{inventory.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-medium">{inventory.sku}</p>
              </div>
              {needsReorder && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-900 text-sm">
                      Low Stock Alert
                    </p>
                    <p className="text-xs text-yellow-800">
                      Stock is below reorder level
                    </p>
                  </div>
                </div>
              )}
              <Badge variant={needsReorder ? "destructive" : "default"}>
                {needsReorder ? "Needs Reorder" : "In Stock"}
              </Badge>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Create Purchase Order
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Adjust Stock
              </Button>
              <Link href="/dashboard/inventory" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Back to Inventory
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

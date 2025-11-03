"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@repo/schema/productSchema";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { formatCurrency } from "@/features/admin/utils";
import { api } from "@/lib/api";
import { ProductImageUpload } from "../_components/product-image-upload";
import { ProductVariantsSection } from "../_components/product-variant-sections";

export default function CreateProductPage() {
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      sku: "",
      slug: "",
      description: "",
      status: "draft",
      price_cents: 0,
    },
  });

  const [productImages, setProductImages] = useState([]);
  const [imageInput, setImageInput] = useState("");
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [variantCombinations, setVariantCombinations] = useState<
    VariantCombination[]
  >([]);

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const addImage = () => {
  //   if (imageInput.trim()) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: [...prev.images, imageInput],
  //     }));
  //     setImageInput("");
  //   }
  // };

  // const removeImage = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: prev.images.filter((_, i) => i !== index),
  //   }));
  // };

  const createProductMutation = useMutation({
    mutationFn: api.product.create,
    onSuccess: (data) => {
      const variantsPayload = variantCombinations.map((v) => ({
        ...v,
        product_id: data.id,
      }));

      if (variantCombinations.length > 0) {
        createProductVariantsMutation.mutate(variantsPayload);
      } else {
        // TODO: Mungkin Redirect ke halaman products
      }

      toast.success("Product Created!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createProductVariantsMutation = useMutation({
    mutationFn: api.product.createVariant,
  });

  const handleSubmit = (data: z.infer<typeof createProductSchema>) => {
    createProductMutation.mutate({
      title: data.title,
      price_cents: data.price_cents,
      sku: data.sku,
      slug: data.slug,
      description: data?.description,
    });
  };

  return (
    <div className="p-0 md:p-8 space-y-6">
      <div className="max-md:p-4">
        <h1 className="text-3xl font-bold text-foreground">Tambah Produk</h1>
        <p className="text-muted-foreground mt-2">
          Tambahkan produk baru ke katalog Anda
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">
                            Nama Produk
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="misal, Baju Kasual"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">
                            Slug
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="misal, baju-kasual"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">
                            SKU
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="misal, MW-001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">
                            Kategori
                          </FormLabel>
                          <FormControl>
                            <Select
                              name={field.name}
                              value={""}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                aria-invalid={fieldState.invalid}
                                className="w-full"
                              >
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                <SelectItem value="casual">Casual</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">
                          Deskripsi
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Deskripsi produk..."
                            rows={4}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Pricing & Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Penetapan Harga & Inventaris</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price_cents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">
                            Harga (IDR)
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  form.setValue(
                                    "price_cents",
                                    Number(e.target.value)
                                  );
                                }}
                                type="number"
                                placeholder="0"
                                step="1000"
                                min={0}
                                className="pr-20"
                              />
                            </FormControl>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              {formatCurrency(field.value)}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <div>
                    <Label className="block text-sm font-medium mb-2">
                      Cost ($)
                    </Label>
                    <Input
                      name="cost"
                      type="number"
                      value={formData.cost}
                      onChange={handleChange}
                      placeholder="0"
                      step="1000"
                    />
                  </div> */}
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">
                        Stock Quantity
                      </FormLabel>
                      <Input
                        name="stock"
                        type="number"
                        // value={formData.stock}
                        // onChange={handleChange}
                        placeholder="0"
                        disabled
                      />
                    </FormItem>
                  </div>
                </CardContent>
              </Card>

              <ProductVariantsSection
                sku={form.getValues("sku")}
                variantOptions={variantOptions}
                setVariantOptions={setVariantOptions}
                variantCombinations={variantCombinations}
                setVariantCombinations={setVariantCombinations}
              />

              {/* Product Images */}
              <ProductImageUpload />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">
                          Status produk
                        </FormLabel>
                        <FormControl>
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger
                              className="w-full"
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder="Pilih status produk" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Aktif</SelectItem>
                              <SelectItem value="inactive">
                                Tidak aktif
                              </SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Badge
                      variant={
                        form.watch("status") === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {form.watch("status") ?? "Draf"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !form.formState.isDirty ||
                      createProductMutation.isPending ||
                      createProductVariantsMutation.isPending
                    }
                  >
                    <Plus />
                    Tambah Produk
                  </Button>
                  <Link href="/dashboard/products" className="block">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      Batal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "label" VARCHAR(50),
    "address_line1" TEXT,
    "address_line2" TEXT,
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "country" VARCHAR(100),
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "contact_email" VARCHAR(320),
    "phone" VARCHAR(50),

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "supplier_id" INTEGER,
    "category_id" INTEGER,
    "title" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(320) NOT NULL,
    "description" TEXT,
    "price_cents" BIGINT NOT NULL,
    "currency" CHAR(3) NOT NULL DEFAULT 'IDR',
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" SERIAL NOT NULL,
    "product_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariants" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "sku" VARCHAR(100),
    "option_values" JSONB,
    "additional_price_cents" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "variant_id" UUID NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "reserved_quantity" INTEGER NOT NULL DEFAULT 0,
    "safety_stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" SERIAL NOT NULL,
    "cart_id" UUID NOT NULL,
    "variant_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "added_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL DEFAULT 'Default',

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItems" (
    "id" SERIAL NOT NULL,
    "wishlist_id" UUID NOT NULL,
    "variant_id" UUID NOT NULL,
    "added_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_id" INTEGER,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "subtotal_cents" BIGINT NOT NULL,
    "shipping_cents" BIGINT NOT NULL DEFAULT 0,
    "tax_cents" BIGINT NOT NULL DEFAULT 0,
    "discount_cents" BIGINT NOT NULL DEFAULT 0,
    "total_cents" BIGINT NOT NULL,
    "coupon_code" VARCHAR(100),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "order_id" UUID NOT NULL,
    "variant_id" UUID,
    "sku" VARCHAR(100),
    "title" VARCHAR(400),
    "unit_price_cents" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price_cents" BIGINT NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "provider" VARCHAR(100),
    "provider_payment_id" VARCHAR(200),
    "status" VARCHAR(50),
    "amount_cents" BIGINT NOT NULL,
    "currency" CHAR(3) NOT NULL DEFAULT 'IDR',
    "paid_at" TIMESTAMPTZ,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment_Method" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150),
    "carrier_code" VARCHAR(50),

    CONSTRAINT "Shipment_Method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipments" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "shipment_method_id" INTEGER,
    "tracking_number" VARCHAR(200),
    "status" VARCHAR(50) NOT NULL DEFAULT 'ready',
    "shipped_at" TIMESTAMPTZ,
    "delivered_at" TIMESTAMPTZ,

    CONSTRAINT "Shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Returns" (
    "id" UUID NOT NULL,
    "order_id" UUID,
    "user_id" TEXT,
    "reason" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'requested',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Returns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnItems" (
    "id" SERIAL NOT NULL,
    "return_id" UUID NOT NULL,
    "order_item_id" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ReturnItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "title" VARCHAR(200),
    "body" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id" UUID NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "discount_type" VARCHAR(20),
    "discount_value" DOUBLE PRECISION,
    "expires_at" TIMESTAMPTZ,
    "usage_limit" INTEGER,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" VARCHAR(100),
    "payload" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLogs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT,
    "action" VARCHAR(200),
    "object_type" VARCHAR(100),
    "object_id" VARCHAR(200),
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariants_sku_key" ON "ProductVariants"("sku");

-- CreateIndex
CREATE INDEX "Inventory_variant_id_idx" ON "Inventory"("variant_id");

-- CreateIndex
CREATE INDEX "Orders_user_id_idx" ON "Orders"("user_id");

-- CreateIndex
CREATE INDEX "OrderItems_order_id_idx" ON "OrderItems"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_code_key" ON "Coupons"("code");

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ProductVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ProductVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipments" ADD CONSTRAINT "Shipments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipments" ADD CONSTRAINT "Shipments_shipment_method_id_fkey" FOREIGN KEY ("shipment_method_id") REFERENCES "Shipment_Method"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Returns" ADD CONSTRAINT "Returns_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Returns" ADD CONSTRAINT "Returns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnItems" ADD CONSTRAINT "ReturnItems_return_id_fkey" FOREIGN KEY ("return_id") REFERENCES "Returns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnItems" ADD CONSTRAINT "ReturnItems_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLogs" ADD CONSTRAINT "AuditLogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

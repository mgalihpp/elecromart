import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StreetWear Shop API",
      version: "1.0.0",
      description:
        "API documentation for StreetWear clothing store (hoodies, tees, apparel)",
      contact: {
        name: "StreetWear Team",
        email: "support@streetwear.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique product identifier",
            },
            title: {
              type: "string",
              description: "Product title",
              example: "Hoodie Oversize Fleece",
            },
            slug: {
              type: "string",
              description: "URL-friendly product identifier",
              example: "hoodie-oversize-fleece",
            },
            description: {
              type: "string",
              description: "Product description",
              example: "Premium fleece hoodie with oversized fit",
            },
            sku: {
              type: "string",
              description: "Stock Keeping Unit",
              example: "HD-OVRZ-BLK-M",
            },
            price_cents: {
              type: "integer",
              format: "int64",
              description: "Product price in cents",
              example: 39900000,
            },
            currency: {
              type: "string",
              description: "Currency code",
              example: "IDR",
              default: "IDR",
            },
            status: {
              type: "string",
              description: "Product status",
              example: "active",
              default: "active",
            },
            category_id: {
              type: "integer",
              description: "Category ID",
              example: 1,
            },
            supplier_id: {
              type: "integer",
              description: "Supplier ID",
              example: 1,
            },
            category: {
              $ref: "#/components/schemas/Category",
            },
            product_images: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ProductImage",
              },
            },
            product_variants: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ProductVariant",
              },
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Unique category identifier" },
            name: {
              type: "string",
              description: "Category name",
              example: "Hoodies",
            },
            slug: {
              type: "string",
              description: "URL-friendly category identifier",
              example: "hoodies",
            },
            description: {
              type: "string",
              description: "Category description",
              example: "Hoodies and sweatshirts",
            },
            parent_id: {
              type: "integer",
              description: "Parent category ID for hierarchical categories",
              example: null,
            },
          },
        },
        ProductVariant: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique variant identifier",
            },
            product_id: {
              type: "string",
              format: "uuid",
              description: "Parent product ID",
            },
            sku: {
              type: "string",
              description: "Stock Keeping Unit",
              example: "HD-OVRZ-BLK-M",
            },
            option_values: {
              type: "object",
              description: "Variant options (color, size, etc.)",
              example: { color: "Black", size: "M" },
            },
            additional_price_cents: {
              type: "integer",
              format: "int64",
              description: "Additional price for this variant",
              example: 0,
            },
            inventory: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Inventory",
              },
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
          },
        },
        Inventory: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Unique inventory identifier" },
            variant_id: {
              type: "string",
              format: "uuid",
              description: "Product variant ID",
            },
            stock_quantity: {
              type: "integer",
              description: "Available stock quantity",
              example: 50,
            },
            reserved_quantity: {
              type: "integer",
              description: "Reserved stock quantity",
              example: 5,
            },
            safety_stock: {
              type: "integer",
              description: "Minimum stock level",
              example: 10,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: {
              type: "string",
              description: "Error message",
              example: "Product not found",
            },
            error: {
              type: "string",
              description: "Error details",
              example: "Validation failed",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              description: "Success message",
              example: "Operation completed successfully",
            },
            data: { type: "object", description: "Response data" },
          },
        },
        ProductImage: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Image ID" },
            product_id: {
              type: "string",
              format: "uuid",
              description: "Product ID",
            },
            url: {
              type: "string",
              format: "uri",
              description: "Image URL",
              example: "https://example.com/images/hoodie-black-front.jpg",
            },
            key: {
              type: "string",
              description: "A key used for delete the image",
              example: "D0ajijkoaff2wafjai299jSIJI",
            },
            alt: {
              type: "string",
              description: "Alt text for accessibility",
              example: "Black oversized hoodie front view",
            },
            sort_order: {
              type: "integer",
              description: "Display order",
              example: 1,
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", description: "User ID" },
            name: {
              type: "string",
              description: "User full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john.doe@example.com",
            },
            emailVerified: {
              type: "boolean",
              description: "Email verification status",
              example: true,
            },
            image: {
              type: "string",
              format: "uri",
              description: "User profile image URL",
              example: "https://example.com/avatars/john.jpg",
            },
            role: {
              type: "string",
              description: "User role",
              example: "customer",
            },
            banned: {
              type: "boolean",
              description: "Account ban status",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", description: "Order ID" },
            user_id: { type: "string", description: "User ID" },
            status: {
              type: "string",
              description: "Order status",
              example: "pending",
              enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
              ],
            },
            subtotal_cents: {
              type: "integer",
              format: "int64",
              description: "Subtotal in cents",
              example: 39900000,
            },
            shipping_cents: {
              type: "integer",
              format: "int64",
              description: "Shipping cost in cents",
              example: 2000000,
            },
            tax_cents: {
              type: "integer",
              format: "int64",
              description: "Tax amount in cents",
              example: 3990000,
            },
            discount_cents: {
              type: "integer",
              format: "int64",
              description: "Discount amount in cents",
              example: 0,
            },
            total_cents: {
              type: "integer",
              format: "int64",
              description: "Total amount in cents",
              example: 45890000,
            },
            coupon_code: {
              type: "string",
              description: "Applied coupon code",
              example: "SAVE10",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Order creation timestamp",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
      },
      parameters: {
        ProductId: {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Product ID",
        },
        CategoryId: {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Category ID",
        },
        VariantId: {
          name: "variantId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Product Variant ID",
        },
        PageQuery: {
          name: "page",
          in: "query",
          schema: { type: "string", default: "1" },
          description: "Page number for pagination",
        },
        LimitQuery: {
          name: "limit",
          in: "query",
          schema: { type: "string", default: "12" },
          description: "Number of items per page",
        },
        SearchQuery: {
          name: "q",
          in: "query",
          schema: { type: "string" },
          description: "Search query",
        },
        CategoryQuery: {
          name: "category",
          in: "query",
          schema: { type: "string" },
          description: "Filter by category slug",
        },
      },
    },
  },
  apis: [
    `${__dirname}/../modules/**/*.route.ts`,
    `${__dirname}/../routes/*.ts`,
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;

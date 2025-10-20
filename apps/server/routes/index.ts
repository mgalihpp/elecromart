import { Router } from "express";
import { productRouter } from "./product.routes";

/**
 * Router utama untuk versi 1 (v1) dari API.
 *
 * Digunakan untuk mengelompokkan route dan middleware yang terkait dengan versi 1 aplikasi.
 * Semua route untuk API v1 harus didaftarkan di sini, dan router ini dipasang di aplikasi
 * Express utama dengan prefix seperti '/api/v1'.
 *
 * Contoh penggunaan:
 * // import v1Router dari file ini lalu daftarkan pada app utama:
 * // app.use('/api/v1', v1Router);
 *
 * @constant
 * @type {import('express').Router}
 * @public
 * @since 1.0.0
 */
const v1Router: Router = Router();

/**
 * Route ini menangani semua endpoint terkait produk.
 * Semua route yang berhubungan dengan data produk, managemen produk.
 * pengguna dikelola di dalam router ini.
 */
v1Router.use("/product", productRouter);

export default v1Router;

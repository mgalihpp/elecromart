/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { db, type Prisma, type PrismaClient } from "@repo/db";

/**
 * BaseService adalah kelas dasar untuk service yang menggunakan Prisma ORM.
 * Kelas ini bisa di-extend oleh service spesifik untuk model tertentu.
 * Contoh penggunaan: class UserService extends BaseService<User> { ... }
 */
export class BaseService<T, ModelName extends keyof PrismaClient> {
  protected db: PrismaClient;
  protected model: ModelName; // Nama model Prisma, misalnya 'user'

  constructor(model: ModelName) {
    this.db = db;
    this.model = model;
  }

  /**
   * Mendapatkan semua data dari model.
   * @param options Opsi pencarian Prisma (opsional).
   * @returns Array dari data model.
   */
  // async findAll(
  //   options?: Prisma.Args<PrismaClient[ModelName], "findMany">["args"]
  // ): Promise<T[]> {
  //   return (this.db[this.model] as any).findMany(options);
  // }

  /**
   * Mendapatkan satu data berdasarkan ID.
   * @param id ID data yang dicari.
   * @param options Opsi pencarian Prisma (opsional).
   * @returns Data model atau null jika tidak ditemukan.
   */
  // async findById(
  //   id: number | string,
  //   options?: Prisma.Args<PrismaClient[ModelName], "findUnique">["args"]
  // ): Promise<T | null> {
  //   return (this.db[this.model] as any).findUnique({
  //     where: { id },
  //     ...options,
  //   });
  // }

  /**
   * Membuat data baru.
   * @param data Data yang akan dibuat.
   * @returns Data yang baru dibuat.
   */
  async create(
    data: Prisma.Args<PrismaClient[ModelName], "create">["args"]["data"],
    ...args: unknown[]
  ): Promise<unknown> {
    return await (this.db[this.model] as any).create({ data });
  }

  /**
   * Memperbarui data berdasarkan ID.
   * @param id ID data yang akan diperbarui.
   * @param data Data yang akan diperbarui.
   * @returns Data yang telah diperbarui.
   */
  async update(
    id: string | number,
    data: Prisma.Args<PrismaClient[ModelName], "update">["args"]["data"],
    ...args: unknown[]
  ): Promise<unknown> {
    return await (this.db[this.model] as any).update({
      where: { id },
      data,
    });
  }

  /**
   * Menghapus data berdasarkan ID.
   * @param id ID data yang akan dihapus.
   * @returns Data yang telah dihapus.
   */
  async delete(id: string | number): Promise<unknown> {
    return await (this.db[this.model] as any).delete({
      where: { id },
    });
  }

  // Metode lain bisa ditambahkan di sini untuk di-extend, misalnya pagination atau filtering lanjutan.
}

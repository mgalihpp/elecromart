import type { Categories } from "@repo/db";
import type { CreateCategoryInput } from "@repo/schema/categorySchema";
import axios from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export const categoryApi = {
  getAll: async () => {
    const res = await axios.get<ApiResponse<Categories[]>>("/categories");
    const { data } = res.data;
    return data;
  },

  create: async (input: CreateCategoryInput) => {
    const res = await axios.post<ApiResponse<Categories>>("/categories", input);
    const { data } = res.data;
    return data;
  },
};

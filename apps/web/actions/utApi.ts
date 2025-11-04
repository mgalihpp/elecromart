"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const removeFile = async (fileKey: string | string[]) => {
  try {
    await utapi.deleteFiles(fileKey);
  } catch (error) {
    console.error(error);
  }
};

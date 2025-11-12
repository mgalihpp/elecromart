import type { Response } from "express";
import type z from "zod";

export class AppResponse<T = unknown> {
  res: Response;
  message?: string;
  success: boolean;
  data?: T;
  error?: unknown;
  errors?: z.core.$ZodIssue[];
  errorCode?: string;
  statusCode: number;

  constructor({
    res,
    message,
    success = true,
    data,
    error,
    errors,
    errorCode,
    statusCode = 200,
  }: {
    res: Response;
    message?: string;
    success?: boolean;
    data?: T;
    error?: unknown;
    errors?: z.core.$ZodIssue[];
    errorCode?: string;
    statusCode?: number;
  }) {
    this.res = res;
    this.message = message;
    this.success = success;
    this.data = data;
    this.error = error;
    this.errors = errors;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.send();
  }

  send() {
    return this.res.status(this.statusCode).json({
      message: this.message,
      success: this.success,
      data: this.data,
      error: this.error,
      errors: this.formatZodErrors(this.errors),
      errorCode: this.errorCode,
    });
  }

  formatZodErrors(errors: z.core.$ZodIssue[] | undefined) {
    if (!errors) return undefined;

    return errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
  }
}

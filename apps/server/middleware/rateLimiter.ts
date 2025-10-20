import rateLimit from "express-rate-limit";
import { HTTPSTATUS } from "@/configs/http";

const WINDOW_MS_1_MIN = 1 * 60 * 1000; // 1 minute
const WINDOW_MS_15_MIN = 15 * 60 * 1000; // 15 minutes
const WINDOW_MS_1_HOUR = 60 * 60 * 1000; // 1 hour

const RATE_LIMIT_MESSAGE =
  "Too many requests from this IP, please try again later.";
const AUTH_RATE_LIMIT_MESSAGE =
  "Too many authentication attempts, please try again later.";
const REGISTER_RATE_LIMIT_MESSAGE =
  "Too many registration attempts, please try again later.";
const USER_MANAGEMENT_RATE_LIMIT_MESSAGE =
  "Too many user management requests, please try again later.";
const UPLOAD_RATE_LIMIT_MESSAGE =
  "Too many file uploads, please try again later.";
const SEARCH_RATE_LIMIT_MESSAGE =
  "Too many search requests, please try again later.";
const ORDER_RATE_LIMIT_MESSAGE =
  "Too many order operations, please try again later.";

const RETRY_AFTER_15_MIN = "15 minutes";
const RETRY_AFTER_1_HOUR = "1 hour";
const RETRY_AFTER_1_MIN = "1 minute";

// General API rate limiter - applies to all API routes
const generalLimiter = rateLimit({
  windowMs: WINDOW_MS_15_MIN, // 15 minutes
  max: 200, // Limit each IP to 100 requests per windowMs
  message: {
    error: RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_15_MIN,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_15_MIN,
    });
  },
});

// Strict rate limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: WINDOW_MS_15_MIN, // 15 minutes
  max: 10, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: AUTH_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_15_MIN,
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: AUTH_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_15_MIN,
    });
  },
});

// Strict rate limiter for user registration
const registerLimiter = rateLimit({
  windowMs: WINDOW_MS_1_HOUR, // 1 hour
  max: 6, // Limit each IP to 3 registration attempts per hour
  message: {
    error: REGISTER_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_1_HOUR,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: REGISTER_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_1_HOUR,
    });
  },
});

// Moderate rate limiter for user management endpoints
const userManagementLimiter = rateLimit({
  windowMs: WINDOW_MS_15_MIN, // 15 minutes
  max: 40, // Limit each IP to 20 requests per windowMs
  message: {
    error: USER_MANAGEMENT_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_15_MIN,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: USER_MANAGEMENT_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_15_MIN,
    });
  },
});

// Rate limiter for file uploads
const uploadLimiter = rateLimit({
  windowMs: WINDOW_MS_15_MIN, // 15 minutes
  max: 20, // Limit each IP to 10 uploads per windowMs
  message: {
    error: UPLOAD_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_15_MIN,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: UPLOAD_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_15_MIN,
    });
  },
});

// Rate limiter for search endpoints
const searchLimiter = rateLimit({
  windowMs: WINDOW_MS_1_MIN, // 1 minute
  max: 60, // Limit each IP to 30 search requests per minute
  message: {
    error: SEARCH_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_1_MIN,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: SEARCH_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_1_MIN,
    });
  },
});

// Rate limiter for order operations
const orderLimiter = rateLimit({
  windowMs: WINDOW_MS_15_MIN, // 15 minutes
  max: 20, // Limit each IP to 15 order operations per windowMs
  message: {
    error: ORDER_RATE_LIMIT_MESSAGE,
    retryAfter: RETRY_AFTER_15_MIN,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      error: ORDER_RATE_LIMIT_MESSAGE,
      retryAfter: RETRY_AFTER_15_MIN,
    });
  },
});

export {
  generalLimiter,
  authLimiter,
  registerLimiter,
  userManagementLimiter,
  uploadLimiter,
  searchLimiter,
  orderLimiter,
};

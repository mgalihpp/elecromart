import * as fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import morgan from "morgan";

// Membuat logs direktori jika belum ada
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  console.log("Logs directory created at", logsDir);
}

// Custom format untuk logging
morgan.token("reqId", (req: Request) => req.reqId || "Unknown");
morgan.token("userId", (req: Request) => req.user?.id || "Anonymous");

// Membuat format log simple
const logFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" reqId=:reqId userId=:userId';

// Membuat write stream untuk menyimpan log ke file
const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
});

// Write stream untuk error log
const errorLogStream = fs.createWriteStream(path.join(logsDir, "error.log"), {
  flags: "a",
});

// Middleware untuk logging
const addRequestId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nanoid } = await import("nanoid");
    req.reqId = nanoid(8);
    res.setHeader("X-Request-ID", req.reqId ?? "Unknown");
    next();
  } catch (error) {
    console.error("Error generating request ID:", error);
    // Fallback ID
    req.reqId = Math.random().toString(36).substr(2, 8);
    res.setHeader("X-Request-ID", req.reqId);
    next();
  }
};

// Standard request logger
const requestLogger = morgan(logFormat, {
  stream: accessLogStream,
  skip: (req, _res) => req.url === "/health", // Skip health checks
});

// Error logger untuk status code 4xx dan 5xx
const errorLogger = morgan(logFormat, {
  stream: errorLogStream,
  skip: (_req, res) => res.statusCode < 400,
});

// Security logger middleware
const securityLogger = (req: Request, _res: Response, next: NextFunction) => {
  // Log suspicious patterns
  const suspiciousPatterns = [
    /script.*alert/i,
    /union.*select/i,
    /drop.*table/i,
    /<script/i,
    /javascript:/i,
  ];

  const url = req.url.toLowerCase();
  const userAgent = (req.get("User-Agent") || "").toLowerCase();

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url) || pattern.test(userAgent)) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        type: "SECURITY_ALERT",
        ip: req.ip || req.connection.remoteAddress,
        method: req.method,
        url: req.url,
        userAgent: req.get("User-Agent"),
        reqId: req.reqId,
        pattern: pattern.source,
      };

      fs.appendFileSync(
        path.join(logsDir, "security.log"),
        JSON.stringify(`${logEntry}\n`),
      );
    }
  }

  next();
};

// Console logger (custom, colored)
const consoleLogger = morgan((tokens, req: Request, res: Response) => {
  const status = Number(tokens.status(req, res));
  const statusColor =
    status >= 500
      ? chalk.red(status.toString())
      : status >= 400
        ? chalk.yellow(status.toString())
        : status >= 300
          ? chalk.cyan(status.toString())
          : chalk.green(status.toString());

  const remote = chalk.gray(tokens["remote-addr"](req, res) || "-");
  const remoteUser = chalk.gray(
    (tokens["remote-user"] ? tokens["remote-user"](req, res) : undefined) ||
      "-",
  );
  const date = chalk.gray(
    tokens.date ? tokens.date(req, res, "clf") : new Date().toUTCString(),
  );
  const method = chalk.blue(tokens.method(req, res));
  const url = chalk.bold(tokens.url(req, res));
  const httpVersion = tokens["http-version"]
    ? tokens["http-version"](req, res)
    : "-";
  const contentLength =
    (tokens.res ? tokens.res(req, res, "content-length") : undefined) || "-";
  const referrer =
    (tokens.referrer ? tokens.referrer(req, res) : undefined) || "-";
  const userAgent =
    (tokens["user-agent"] ? tokens["user-agent"](req, res) : undefined) ||
    "Unknown";
  const reqId = chalk.magenta(
    tokens.reqId ? tokens.reqId(req, res) : (req.reqId ?? "Unknown"),
  );
  const userId = chalk.magenta(
    tokens.userId ? tokens.userId(req, res) : (req.user?.id ?? "Anonymous"),
  );
  const responseTime = chalk.gray(`${tokens["response-time"](req, res)} ms`);

  // Mirror the file logFormat but with colors for console
  return `${remote} - ${remoteUser} [${date}] "${method} ${url} HTTP/${httpVersion}" ${statusColor} ${contentLength} "${referrer}" "${userAgent}" reqId=${reqId} userId=${userId} - ${responseTime}`;
});

export {
  addRequestId,
  requestLogger,
  errorLogger,
  securityLogger,
  consoleLogger,
};

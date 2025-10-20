import cors from "cors";
import express, { type Application } from "express";
import {
  addRequestId,
  consoleLogger,
  errorLogger,
  requestLogger,
  securityLogger,
} from "@/middleware/logger";
import { generalLimiter } from "@/middleware/rateLimiter";
import v1Router from "@/routes";
import appConfig from "./appConfig";
import { corsOptions } from "./cors";

export class Server {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(appConfig.PORT);
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Middleware tambahan dapat ditambahkan di sini
    this.app.use(addRequestId);
    this.app.use(securityLogger);
    this.app.use(requestLogger);
    this.app.use(consoleLogger);
    this.app.use(errorLogger);

    this.app.use(generalLimiter);
  }

  private routes(): void {
    // Daftarkan router untuk API versi 1
    this.app.use(appConfig.BASE_API_PATH, v1Router);
  }

  public listen(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        console.log(
          `Server running on port ${this.port}\n\nRunning: ${appConfig.SERVER_ORIGIN}\n\n`,
        );
        resolve();
      });
    });
  }
}

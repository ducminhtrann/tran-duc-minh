import express from "express";
import { connectDB } from "./database";
import { IRoute } from "./interfaces";
import { errorMiddleware, requestLogger } from "./middlewares";
const PORT = 3000;

class App {
  public app: express.Application;
  constructor(...routes: IRoute[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.connectDB();
    this.initRequestLogging();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`));
  }

  async connectDB() {
    await connectDB();
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initRequestLogging() {
    this.app.use(requestLogger);
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { setupSwagger } from "./config/swagger";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/v1", router);

setupSwagger(app);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
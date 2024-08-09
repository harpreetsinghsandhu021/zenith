import express from "express";
import cors from "cors";
import { orderRouter } from "./routes/orderRouter";
import { depthRouter } from "./routes/depthRouter";
import { kLineRouter } from "./routes/kLineRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/klines", kLineRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

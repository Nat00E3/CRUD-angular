import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import carroRoutes from "./routes/carros.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", carroRoutes);

app.listen(8800);

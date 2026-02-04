import express, { Express } from "express";

// import the item routes from the new routes file
import itemRoutes from "./api/v1/routes/eventRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

app.use(express.json());

// Route handler for items
app.use("/api/v1", eventRoutes);

// Export the app
export default app;
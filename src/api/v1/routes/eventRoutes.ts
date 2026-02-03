import express, { Router } from "express";
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/eventController";

const eventRoutes: Router = express.Router();

eventRoutes.get("/health", getAllItems);
eventRoutes.get("/events", createItem);
eventRoutes.get("/events/:id", updateItem);
eventRoutes.get("/events/:id/popularity", deleteItem);
eventRoutes.post("/events", createItem);
eventRoutes.put("/events/:id", updateItem);
eventRoutes.delete("/events/:id", deleteItem);

export default eventRoutes;
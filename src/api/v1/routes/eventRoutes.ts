import express, { Router } from "express";
import {
    healthCheck,
    eventsCount,
    singleEvent,
    popularity,
    createItem,
    deleteEvent
} from "../controllers/eventController";

const eventRoutes: Router = express.Router();

eventRoutes.get("/health", healthCheck);
eventRoutes.get("/events", eventsCount);
eventRoutes.get("/events/:id", singleEvent);
eventRoutes.get("/events/:id/popularity", popularity);
eventRoutes.post("/events", createItem);
//eventRoutes.put("/events/:id", updateItem);
eventRoutes.delete("/events/:id", deleteEvent);

export default eventRoutes;
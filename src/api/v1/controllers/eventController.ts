import { Request, Response } from "express";
import { HealthCheckResponse } from "../../../interface_properties";
import * as itemService from "../services/eventService";

export const healthCheck = (req: Request, res: Response): void => {
    const healthCheck:HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.send(healthCheck);
};

export const eventsCount = (req: Request, res: Response): void => {
    const countData = itemService.eventsCount();
    res.status(200).json({ message: "Number of events", data: countData });
};

export const singleEvent = (req: Request, res: Response): void => {
    const eventId  = Number(req.params.id);
    const event = itemService.singleEvent(eventId);
    if (!itemService.singleEvent(eventId)){
        res.status(401).json({ message: "Event does not found." });
    }
    res.status(200).json({ message: "Event selected", data: event });
};

export const popularity = (req: Request, res: Response): void => {
    const eventId  = Number(req.params.id);
    const event = itemService.popularity(eventId);
    res.status(200).json({ message: "Item selected with popularity:", data:event });
};

export const createItem = (req: Request, res: Response): void => {
    const { name, date, capacity } = req.body;
    const newItem: EventCreateInput = createItem(
    name,
    date,               
    capacity  
  );
    res.status(201).json({ message: "Item created", data: newItem });
};



export const deleteEvent = (req: Request, res: Response): void => {
    const eventId  = Number(req.params.id);
    itemService.deleteEvent(eventId);
    res.status(200).json({ message: "Item deleted" });
};


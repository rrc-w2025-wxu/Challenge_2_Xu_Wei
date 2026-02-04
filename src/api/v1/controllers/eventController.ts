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
    const
    itemService.createItem(newItem);
    res.status(201).json({ message: "Item created", data: newItem });
};

export const updateItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    const updatedItem: string = req.body;
    itemService.updateItem(id, updatedItem);
    res.status(200).json({ message: "Item updated", data: updatedItem });
};

export const deleteItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    itemService.deleteItem(id);
    res.status(200).json({ message: "Item deleted" });
};
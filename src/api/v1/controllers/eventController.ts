import { Request, Response } from "express";
import * as itemService from "../services/itemService";

export const healthCheck = (req: Request, res: Response): void => {
    const items: string[] = itemService.getAllItems();
    res.status(200).json({ message: "Get all items", data: items });
};

export const createItem = (req: Request, res: Response): void => {
    const newItem: string = req.body;
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
import express, { Express } from "express";
import { gameStatistics } from "./interface_properties";
import { HealthCheckResponse } from "./interface_properties";
import { activePlayer } from "./services/playerService";
import { searchPlayer } from "./services/playerService";
import { ratingPlayer } from "./services/playerService";

// Initialize Express application
const app: Express = express();

// Returns health check (status, uptime, timestamp, version)
app.get("/api/v1/health", (req, res) => {
    const healthCheck: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    }
    res.json(healthCheck);
});

// Returns all players with a count
app.get("/api/v1/players",(req, res) => {
    const playerlist:gameStatistics[] = activePlayer();
    res.send(playerlist);
});

// Returns a single player by ID (404 if not found)
app.get("/api/v1/players/:id", (req, res) => {
    const id:number = Number(req.params.id);
    const playersingle = searchPlayer(id);

    if(!playersingle){
        return res.status(404).send("Play is not found.");
    }
    res.status(200).send(playersingle);
});

// Returns the calculated performance rating
app.get("/api/v1/players/:id/rating", (req, res) => {
    const id:number = Number(req.params.id);
    const playerRating = ratingPlayer(id);

    if(!playerRating){
        return res.status(404).send("Player is not found.");
    }
    return res.status(200).send(playerRating);
});

export default app;
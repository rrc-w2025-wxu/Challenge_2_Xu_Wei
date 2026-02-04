import express, { Express } from "express";
import { events } from "../../../data/eventData";
import { Event } from "../../../interface_properties";

// Returns all players with a count
export function eventsCount(){
    const eventsData:Event[] = events;

    const result:number = eventsData.length;

    return result;
}

// Returns a single player by ID (404 if not found)
export function singleEvent(id:number):Event | undefined{
    const eventsData:Event[] = events;

    for(let event of eventsData){
        if(id === event.id){
            return event;
        };
    };

    return undefined;
};

// Returns the calculated performance rating
export function ratingPlayer(id:number):gameStatistics | undefined{
    const players:gameStatistics[] = playerData;

    for(let player of players){
        if(id === player.id){
            const totalGames = player.wins + player.losses

            const rating = totalGames > 0
                ? ((player.wins / totalGames) * 100 + (player.totalScore / totalGames)).toFixed(2)
                : "0.00";

            player.rating = rating;
            return player;
            
        };
    };
    
    return undefined;
}


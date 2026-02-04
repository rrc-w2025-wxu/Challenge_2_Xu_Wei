import express, { Express } from "express";
import { events } from "../../../data/eventData";
import { Event } from "../../../interface_properties";
import { EventCreateInput } from "../../../interface_properties";


// Returns all events with a count
export function eventsCount(){
    const eventsData:Event[] = events;

    const result:number = eventsData.length;

    return result;
}

// Returns a single event by ID (404 if not found)
export function singleEvent(id:number):Event | undefined{
    const eventsData:Event[] = events;

    for(let event of eventsData){
        if(id === event.id){
            return event;
        };
    };
    return undefined;
};

// Returns the event with calculated popularity score and tier
export function popularity(id:number):Event | undefined{
    const allevents:Event[] = events;

    for(let event of allevents){
        if(id === event.id){
            const popularityScore = (event.registrationCount / event.capacity) * 100

            switch(true){
                case popularityScore >= 90:
                    event.tier = "Hot";
                    break;
                case popularityScore >= 70:
                    event.tier = "Popular";
                    break;
                case popularityScore >= 50:
                    event.tier = "Moderate";
                    break;
                case popularityScore >= 25:
                    event.tier = "Building";
                    break;
                default:
                    event.tier = "New";
            }
            return event;   
        };
    };
    
    return undefined;
}

export function createItem(eventName:string, date:string = new Date().toISOString(), capacity:number):EventCreateInput {
    const newEvent: EventCreateInput = {
        name: eventName,
        date,
        capacity,
    };
    return newEvent;
};



export function deleteEvent(id:number):Event | undefined{
    const eventsData:Event[] = events;

    for(let event of eventsData){
        if(id === event.id){
            return event;
        };
    };
    return undefined;
};
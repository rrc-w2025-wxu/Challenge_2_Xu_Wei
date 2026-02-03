export interface Event {
    id: number;
    name: string;
    date: string; 
    capacity: number;
    registrationCount: number;
}

export interface Attendee {
    id: number;
    name: string;
    email: string;
}

export enum PopularityTier {
    Hot = "Hot",            // 90% or higher
    Popular = "Popular",    // 70% to 89%
    Moderate = "Moderate",  // 50% to 69%
    Building = "Building",  // 25% to 49%
    New = "New"             // Below 25%
}

export interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
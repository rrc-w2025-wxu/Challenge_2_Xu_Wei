export interface gameStatistics{
    id: number,
    name: string,
    wins: number,
    losses: number,
    totalScore: number,
    rating?: string
}


export interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
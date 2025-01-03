export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type Status = 'OPEN' | 'CLOSED' | 'CANCELLED';

export interface Post {
    id: number;
    title: string;
    description: string;
    courtName: string;
    location: string;
    date: string;
    time: string;
    level: Level;
    currentPlayers: number;
    maxPlayers: number;
    cost: number;
    rules: string;
    hostId: number;
    status: Status;
    createdAt: string;
    updatedAt: string;
}
import { Game } from "backend";

export interface AppData {
    gameId: string,
    userId: string,
    adminCode: string,
    isInGame: boolean,
}

export interface GameProps {
    game: Game,
    userId: string,
    adminCode: string,
    isAdmin: boolean,
}
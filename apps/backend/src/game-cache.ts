import { GetGame, UpdateGame } from "./game-dal";

import { Game } from "@prisma/client";

export class GameCache{
  private cache: Map<string, Game> = new Map<string, Game>();
    public async get(id:string): Promise<Game> {
      const hasKey = this.cache.has(id);
      if(!hasKey){
        const game = await GetGame(id);
        if(!game){
          throw new Error("Game not found");
        }
        this.cache.set(id, game);
      }
        return this.cache.get(id) as Game;
    }
  public async update( game: Game){
    await UpdateGame(game);
    this.cache.set(game.id, game);
    }
  public RemoveFromCache(id:string){
    this.cache.delete(id);
  }
}
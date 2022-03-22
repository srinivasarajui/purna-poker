import type { Game } from "@prisma/client";
export type GetGameType = (id: string) => Promise<Game | null | undefined>;
export type UpdateGameType = (game: Game) => Promise<void>;
export class GameCache {
  private cache: Map<string, Game> = new Map<string, Game>();
  constructor(private GetGame: GetGameType, private UpdateGame: UpdateGameType) { }
  public async get(id: string): Promise<Game | null> {
    const hasKey = this.cache.has(id);
    if (!hasKey) {
      const game = await this.GetGame(id);
      if (!game) {
        return null;
      }
      this.cache.set(id, game);
    }
    return this.cache.get(id) as Game;
  }
  public async update(game: Game) {

    this.cache.set(game.id, game);
    this.UpdateGame(game);
  }
  public RemoveFromCache(id: string) {
    this.cache.delete(id);
  }
}

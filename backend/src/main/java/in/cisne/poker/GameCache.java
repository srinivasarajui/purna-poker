package in.cisne.poker;

import java.util.concurrent.ConcurrentHashMap;
import javax.enterprise.context.ApplicationScoped;
import in.cisne.poker.data.Game;

@ApplicationScoped
public class GameCache {
  private ConcurrentHashMap<String, Game> map = new ConcurrentHashMap<>();

  public void set(Game game) {
    map.put(game.getIdString(), game);
  }

  public Game get(String code) {
    return map.get(code);
  }

  public void remove(String gameId) {
    map.remove(gameId);
  }
}

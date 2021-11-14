package in.cisne.poker;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.Session;

import in.cisne.poker.data.Game;
import in.cisne.poker.util.JSONUtils;
import in.cisne.poker.util.ListUtil;

@ApplicationScoped
public class GameNotifier {

  @Inject
  JSONUtils utils;

  private Map<String, List<Session>> sessionsMap = new ConcurrentHashMap<>();

  private List<Session> getSessionsById(String gameId) {
    return sessionsMap.computeIfAbsent(gameId, string -> ListUtil.getNewSyncList());
  }

  public void addSession(Session session) {
    var gameId = session.getPathParameters().get("gameId");
    getSessionsById(gameId).add(session);
  }

  public boolean removeSession(Session session) {
    var gameId = session.getPathParameters().get("gameId");
    getSessionsById(gameId).removeIf(v -> v.getId().equals(session.getId()));
    var size = getSessionsById(gameId).size();
    if (size == 0) {
      sessionsMap.remove(gameId);
      return true;
    }
    return false;
  }

  public void notify(Game game) throws Exception {
    var gameId = game.getIdString();
    var gameJson = utils.gameAsJSONString(game);
    getSessionsById(gameId).forEach(session -> {
      if (session.isOpen()) {
        session.getAsyncRemote().sendText(gameJson);
      }
    });
  }

  public boolean checkUser(String gameId, String name) {
    return getSessionsById(gameId).stream().filter(s -> name.equals(s.getPathParameters().get("username"))).count() > 0;
  }

}

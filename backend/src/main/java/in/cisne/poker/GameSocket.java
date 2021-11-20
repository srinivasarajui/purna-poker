package in.cisne.poker;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.bson.types.ObjectId;
import in.cisne.poker.data.Game;
import in.cisne.poker.data.VotingSystem;
import in.cisne.poker.util.JSONUtils;
import io.smallrye.mutiny.Uni;

@ServerEndpoint(value = "/socket/{username}/{gameId}")
@ApplicationScoped
public class GameSocket {

  @Inject
  JSONUtils utils;

  @Inject
  GameNotifier notifier;

  @Inject
  GameCache gameCache;

  @Inject
  PointsCache pointsCache;

  @OnOpen
  public void onOpen(Session session, @PathParam("gameId") String gameId, @PathParam("username") String userId) {
    String username = decodeValue(userId);
    notifier.addSession(session);
    Game game = gameCache.get(gameId);
    if (game == null) {
      Uni<Game> uniGame = Game.findById(new ObjectId(gameId));
      uniGame.subscribe().with(item -> {
        gameCache.set(item);
        if (pointsCache.get(item.votingSystemId) == null) {
          Uni<VotingSystem> vs = VotingSystem.findById(item.votingSystemId);
          vs.subscribe().with(v -> pointsCache.put(item.votingSystemId, v));
        }
        item.updateParticipant(username, true);
        notify(item);
        save(item);

      }, err -> err.printStackTrace());
    } else {
      game.updateParticipant(username, true);
      notify(game);
      save(game);
    }

  }

  @OnClose
  public void onClose(Session session, @PathParam("gameId") String gameId, @PathParam("username") String userId) {
    String username = decodeValue(userId);
    if (notifier.removeSession(session)) {
      updateParticipant(gameId, username);
      gameCache.remove(gameId);
    } else {
      if (!notifier.checkUser(gameId, username)) {
        updateParticipant(gameId, username);
      }

    }

  }

  private void updateParticipant(String gameId, String username) {
    var game = gameCache.get(gameId);
    game.updateParticipant(username, false);
    save(game);
    notify(game);
  }

  @OnMessage
  public void onMessage(String message, @PathParam("username") String userId, @PathParam("gameId") String gameId)
      throws JsonProcessingException {
    String username = decodeValue(userId);
    var object = utils.stringAsMessageDTO(message);
    var game = gameCache.get(gameId);
    switch (object.code) {
    case "changeGameName":
      game.name = object.text;
      break;
    case "addStory":
      game.addStory(object.text);
      break;
    case "deleteStory":
      game.removeStory(object.id);
      break;
    case "updateStoryDesc":
      game.updateStorDesc(object.id, object.text);
      break;
    case "startGame":
      game.startGame(object.text);
      break;
    case "stopGame":
      game.stopGame();
      break;
    case "setEstimation":
      game.setEstimation(username, object.points);
      break;
    case "flipPoints":
      game.flipPoints(pointsCache);
      break;
    case "moveToPreviousStory":
      game.moveToPreviousStory();
      break;
    case "moveToNextStory":
      game.moveToNextStory();
      break;
    case "resetPoints":
      game.resetPoints();
      break;
    case "updatePoints":
      game.updatePoints(object.points);
      break;

    }
    notify(game);
    save(game);

  }

  private void notify(Game game) {
    try {
      notifier.notify(game);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private void save(Game game) {
    processUni(game.update());
  }

  private void processUni(Uni<Game> uniGame) {
    uniGame.subscribe().with(item -> {
      System.out.println("Pushed : " + item.name + ":" + item.getIdString());
    }, error -> System.out.println("Error" + error.getMessage()));
  }

  private String decodeValue(String value) {
    try {
      return URLDecoder.decode(value, StandardCharsets.UTF_8.toString());
    } catch (UnsupportedEncodingException ex) {
      throw new RuntimeException(ex.getCause());
    }
  }
}
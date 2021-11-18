package in.cisne.poker.data;

import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import org.bson.codecs.pojo.annotations.BsonIgnore;

import in.cisne.poker.PointsCache;
import in.cisne.poker.util.ListUtil;
import in.cisne.poker.util.StringUtil;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import io.smallrye.mutiny.Uni;

public class Game extends ReactivePanacheMongoEntity {
  public String name;
  public boolean didGameStart;
  public String controllerName;
  public String currentStoryId;
  public String votingSystemId;

  public String adminCode;

  public List<Story> stories;
  public List<Participant> participants;

  public List<Participant> getParticipants() {
    if (participants == null) {
      participants = ListUtil.getNewSyncList();
    }
    return participants;
  }

  public List<Story> getStories() {
    if (stories == null) {
      stories = ListUtil.getNewSyncList();
    }
    return stories;
  }

  @BsonIgnore
  public String getIdString() {

    return id != null ? id.toString() : null;
  }

  public void addStory(String text) {
    Story story = new Story();
    story.description = text;
    story.id = UUID.randomUUID().toString();
    this.getStories().add(story);
  }

  public void removeStory(String id) {
    this.getStories().removeIf(story -> id.equals(story.id));
  }

  public Story findStoryById(String id) {
    return this.getStories().stream().filter(s -> id.equals(s.id)).findFirst().get();
  }

  public int findStoryIndexById(String id) {
    var stories = this.getStories();
    return IntStream.range(0, stories.size()).filter(index -> stories.get(index).id.equals(id)).findFirst()
        .orElseThrow();
  }

  public void updateStorDesc(String id, String text) {
    findStoryById(id).description = text;
  }

  public void updateParticipant(String name, boolean isConnected) {
    this.getParticipants().stream().filter(p -> name.equals(p.name)).findAny().ifPresentOrElse(p -> {
      p.isConnected = isConnected;
    }, () -> {
      Participant p = new Participant();
      p.isConnected = isConnected;
      p.name = name;
      this.getParticipants().add(p);
    });
  }

  public void addParticipant(String name, boolean isAdmin) {

    this.getParticipants().stream().filter(p -> name.equals(p.name)).findAny().ifPresentOrElse(p -> {
      p.isAdmin = isAdmin;
    }, () -> {
      Participant p = new Participant();
      p.isAdmin = isAdmin;
      p.name = name;
      this.getParticipants().add(p);
    });

  }

  public static Uni<Game> newGame(String name, String votingSystemId, String participantName) {
    Game game = new Game();
    game.name = name;
    game.votingSystemId = votingSystemId;
    game.adminCode = StringUtil.getRandomString();
    game.addParticipant(participantName, true);
    return game.<Game>persist();
  }

  public void startGame(String name) {
    if (getStories().size() != 0) {
      didGameStart = true;
      controllerName = name;
      currentStoryId = getStories().get(0).id;
    }

  }

  public void stopGame() {
    didGameStart = false;
  }

  public void moveToNextStory() {
    var stories = this.getStories();
    int index = findStoryIndexById(currentStoryId);
    int nextIndex = (index + 1) % stories.size();
    this.currentStoryId = stories.get(nextIndex).id;
  }

  public void moveToPreviousStory() {
    var stories = this.getStories();
    int index = findStoryIndexById(currentStoryId);
    int nextIndex = index == 0 ? stories.size() - 1 : (index - 1);
    this.currentStoryId = stories.get(nextIndex).id;
  }

  public void updatePoints(int points) {
    findStoryById(currentStoryId).updatePoints(points);
  }

  public void resetPoints() {
    findStoryById(currentStoryId).resetPoints();
  }

  public void flipPoints(PointsCache pointsCache) {

    findStoryById(currentStoryId).flipPoints(pointsCache.get(votingSystemId));
  }

  public void setEstimation(String name, int points) {
    findStoryById(currentStoryId).setEstimation(name, points);
  }
}
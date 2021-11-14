package in.cisne.poker.data;

import java.util.List;

import in.cisne.poker.util.ListUtil;

public class Story {
  public String id;
  public String description;
  public boolean isEstimated;
  public int storyPoints;
  private List<ParticipantEstimation> participantEstimations;
  public boolean areCardsOpen;

  public List<ParticipantEstimation> getParticipantEstimations() {
    if (participantEstimations == null) {
      participantEstimations = ListUtil.getNewSyncList();
    }
    return participantEstimations;
  }

  public ParticipantEstimation getParticipantEstimation(String name) {
    var oEstimation = getParticipantEstimations().stream().filter(p -> name.equals(p.name)).findFirst();
    if (oEstimation.isPresent()) {
      return oEstimation.get();
    } else {
      var estimation = new ParticipantEstimation();
      estimation.name = name;
      participantEstimations.add(estimation);
      return estimation;
    }
  }

  public void setEstimation(String name, int points) {
    getParticipantEstimation(name).storyPoints = points;
  }

  public void updatePoints(int points) {
    this.storyPoints = points;
  }

  public void resetPoints() {
    this.participantEstimations = ListUtil.getNewSyncList();
    this.areCardsOpen = false;
    this.isEstimated = false;
    this.storyPoints = 0;
  }

  public void flipPoints(VotingSystem vs) {
    this.areCardsOpen = !this.areCardsOpen;
    if (this.areCardsOpen && this.getParticipantEstimations().size() > 0) {
      this.isEstimated = true;
      this.storyPoints = calculateStoryPoints(vs);
    }
  }

  public int calculateStoryPoints(VotingSystem vs) {
    var points = getParticipantEstimations().stream().map(x -> x.storyPoints).filter(x -> x > 0)
        .mapToInt(x -> x.intValue()).average();
    return vs.roundupPoints((int) Math.ceil(points.isPresent() ? points.getAsDouble() : 0));
  }
}

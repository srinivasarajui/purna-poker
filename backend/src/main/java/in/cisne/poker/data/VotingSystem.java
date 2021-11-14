package in.cisne.poker.data;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonId;

import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntityBase;

public class VotingSystem extends ReactivePanacheMongoEntityBase {

  public String displayText;
  public List<VotingPoints> points;
  @BsonId
  public String code;

  public int roundupPoints(int avg) {
    var item = points.stream().map(p -> p.storyPoints).filter(p -> p >= avg).findFirst();
    if (item.isPresent()) {
      return item.get();
    }
    return avg;
  }
}

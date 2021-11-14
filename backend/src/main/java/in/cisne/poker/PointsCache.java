package in.cisne.poker;

import in.cisne.poker.data.VotingSystem;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PointsCache {
  private ConcurrentHashMap<String, VotingSystem> map = new ConcurrentHashMap<>();

  public VotingSystem get(String code) {
    return map.get(code);
  }

  public void put(String code, VotingSystem vs) {
    map.put(code, vs);
  }

}
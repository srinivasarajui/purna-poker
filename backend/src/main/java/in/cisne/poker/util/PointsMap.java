package in.cisne.poker.util;

import java.util.Arrays;

public final class PointsMap {
  private PointsMap() {
  }



  public static final int roundupPoints(int avg) {
    int[] array = { 0, 1, 2, 3, 5, 8, 13, 21, 43 };
    var item = Arrays.stream(array).filter(p -> p >= avg).findFirst();
    if (item.isPresent()) {
      return item.getAsInt();
    }
    return avg;

  }
}

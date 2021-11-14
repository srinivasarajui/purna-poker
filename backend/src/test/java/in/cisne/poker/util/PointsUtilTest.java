package in.cisne.poker.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class PointsUtilTest {

  @Test
  public void roundupPointsTest() {
    Assertions.assertEquals(1, PointsMap.roundupPoints(1));
    Assertions.assertEquals(2, PointsMap.roundupPoints(2));
    Assertions.assertEquals(3, PointsMap.roundupPoints(3));
    Assertions.assertEquals(5, PointsMap.roundupPoints(4));
    Assertions.assertEquals(43, PointsMap.roundupPoints(42));
    Assertions.assertEquals(43, PointsMap.roundupPoints(43));
    Assertions.assertEquals(44, PointsMap.roundupPoints(44));
  }
}

package in.cisne.poker.util;

import java.util.Random;

public class StringUtil {
  static Random random = new Random();

  public static String getRandomString() {
    return random.ints(48, 122 + 1).filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(6)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
  }
}

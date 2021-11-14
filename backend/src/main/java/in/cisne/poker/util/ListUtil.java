package in.cisne.poker.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class ListUtil {
  private ListUtil() {
  }

  public static <T> List<T> getNewSyncList() {
    return Collections.synchronizedList(new ArrayList<>());
  }
}

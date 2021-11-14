package in.cisne.poker.data;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class GameTest {
  @Test
  public void startGameTest() {
    Game game = new Game();
    Assertions.assertNull(game.getIdString());
    game.persist().await().indefinitely();
    Assertions.assertTrue(game.getIdString().length() > 0);
  }

  @Test
  public void addStoryTest() {
    Game game = new Game();
    Assertions.assertEquals(0, game.getStories().size());
    game.addStory("Sample story");
    Assertions.assertEquals(1, game.getStories().size());
    Assertions.assertEquals("Sample story", game.getStories().get(0).description);
    Assertions.assertTrue(game.getStories().get(0).id.length() > 0);
    Assertions.assertFalse(game.getStories().get(0).areCardsOpen);
  }
}

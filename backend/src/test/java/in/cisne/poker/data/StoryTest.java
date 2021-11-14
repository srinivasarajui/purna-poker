package in.cisne.poker.data;

import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class StoryTest {

  private VotingSystem getFibonacci() {
    VotingSystem vs = new VotingSystem();
    vs.displayText = "Fibonacci";
    vs.code = "fib";
    vs.points = new ArrayList<>();
    VotingPoints points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "1";
    points.storyPoints = 1;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "2";
    points.storyPoints = 2;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "3";
    points.storyPoints = 3;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "5";
    points.storyPoints = 5;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "8";
    points.storyPoints = 8;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "13";
    points.storyPoints = 13;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "21";
    points.storyPoints = 21;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "43";
    points.storyPoints = 43;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.QUESTION;
    points.displayText = "?";
    points.storyPoints = -1;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.QUESTION;
    points.displayText = "pass";
    points.storyPoints = -2;
    vs.points.add(points);
    return vs;
  }

  @Test
  public void calculateStoryPointsWithOneEstimationTest() {

    Story story = new Story();
    ParticipantEstimation pe = new ParticipantEstimation();
    pe.storyPoints = 42;
    story.getParticipantEstimations().add(pe);
    Assertions.assertEquals(43, story.calculateStoryPoints(getFibonacci()));
  }

  @Test
  public void calculateStoryPointsWithMultipleEstimationsTest() {
    Story story = new Story();
    ParticipantEstimation pe = new ParticipantEstimation();
    pe.storyPoints = 8;
    story.getParticipantEstimations().add(pe);
    ParticipantEstimation pe1 = new ParticipantEstimation();
    pe1.storyPoints = 13;
    story.getParticipantEstimations().add(pe1);
    Assertions.assertEquals(13, story.calculateStoryPoints(getFibonacci()));
  }

  @Test
  public void calculateStoryPointsWithNegativeEstimationsTest() {
    Story story = new Story();
    ParticipantEstimation pe = new ParticipantEstimation();
    pe.storyPoints = 13;
    story.getParticipantEstimations().add(pe);
    ParticipantEstimation pe1 = new ParticipantEstimation();
    pe1.storyPoints = -2;
    story.getParticipantEstimations().add(pe1);
    Assertions.assertEquals(13, story.calculateStoryPoints(getFibonacci()));
  }

  @Test
  public void calculateStoryPointsWithSingleNegativeEstimationsTest() {
    Story story = new Story();
    ParticipantEstimation pe1 = new ParticipantEstimation();
    pe1.storyPoints = -2;
    story.getParticipantEstimations().add(pe1);
    Assertions.assertEquals(1, story.calculateStoryPoints(getFibonacci()));
  }

  @Test
  public void getParticipantEstimationEmptyTest() {
    Story story = new Story();
    ParticipantEstimation pe = story.getParticipantEstimation("Srini");
    Assertions.assertNotNull(pe);
    Assertions.assertEquals("Srini", pe.name);
    Assertions.assertEquals(0, pe.storyPoints);
  }

  @Test
  public void getParticipantEstimationValueTest() {
    Story story = new Story();
    ParticipantEstimation newPE = new ParticipantEstimation();
    newPE.name = "Srini";
    newPE.storyPoints = 5;
    story.getParticipantEstimations().add(newPE);
    ParticipantEstimation pe = story.getParticipantEstimation("Srini");
    Assertions.assertNotNull(pe);
    Assertions.assertEquals("Srini", pe.name);
    Assertions.assertEquals(5, pe.storyPoints);
  }

  @Test
  public void resetPointsTest() {
    Story story = new Story();
    ParticipantEstimation newPE = new ParticipantEstimation();
    newPE.name = "Srini";
    newPE.storyPoints = 5;
    story.getParticipantEstimations().add(newPE);
    story.resetPoints();
    Assertions.assertEquals(0, story.getParticipantEstimations().size());
    Assertions.assertEquals(0, story.storyPoints);
    Assertions.assertFalse(story.areCardsOpen);
    Assertions.assertFalse(story.isEstimated);
  }

  @Test
  public void flipPointsTest() {
    Story story = new Story();
    ParticipantEstimation newPE = new ParticipantEstimation();
    newPE.name = "Srini";
    newPE.storyPoints = 5;
    story.getParticipantEstimations().add(newPE);
    story.flipPoints(getFibonacci());
    Assertions.assertEquals(1, story.getParticipantEstimations().size());
    Assertions.assertEquals(5, story.storyPoints);
    Assertions.assertTrue(story.areCardsOpen);
    Assertions.assertTrue(story.isEstimated);
    story.flipPoints(getFibonacci());
    Assertions.assertFalse(story.areCardsOpen);
  }

  @Test
  public void setEstimationTest() {
    Story story = new Story();
    story.setEstimation("srini", 5);
    Assertions.assertEquals(1, story.getParticipantEstimations().size());
    Assertions.assertEquals(5, story.getParticipantEstimations().get(0).storyPoints);
    Assertions.assertEquals("srini", story.getParticipantEstimations().get(0).name);
  }
}
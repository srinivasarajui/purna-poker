package in.cisne.poker;

import java.util.ArrayList;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import in.cisne.poker.data.PointsCategory;
import in.cisne.poker.data.VotingPoints;
import in.cisne.poker.data.VotingSystem;
import io.quarkus.runtime.Startup;

@Startup
@ApplicationScoped
public class DataLoad {

  @Inject
  PointsCache cache;

  DataLoad() {
    var count = VotingSystem.count().await().indefinitely();
    if (count == 0) {

      fibonacciLoad();
      modifiedFibonacciLoad();
      tShirtsLoad();
      squaresLoad();
    }

  }

  private void fibonacciLoad() {
    VotingSystem vs = new VotingSystem();
    vs.displayText = "Fibonacci";
    vs.code = "fib";
    vs.points = new ArrayList<>();
    VotingPoints points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "0";
    points.storyPoints = 0;
    vs.points.add(points);
    points = new VotingPoints();
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
    vs.persist().await().indefinitely();
  }

  private void modifiedFibonacciLoad() {
    VotingSystem vs = new VotingSystem();
    vs.displayText = "Modified Fibonacci";
    vs.code = "mfib";
    vs.points = new ArrayList<>();
    VotingPoints points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "0";
    points.storyPoints = 0;
    vs.points.add(points);
    points = new VotingPoints();
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
    points.displayText = "20";
    points.storyPoints = 20;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "40";
    points.storyPoints = 40;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "100";
    points.storyPoints = 100;
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
    vs.persist().await().indefinitely();
  }

  private void tShirtsLoad() {
    VotingSystem vs = new VotingSystem();
    vs.displayText = "T Shirts Size";
    vs.code = "tshirt";
    vs.points = new ArrayList<>();
    VotingPoints points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "xxs";
    points.storyPoints = 1;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "xs";
    points.storyPoints = 2;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "s";
    points.storyPoints = 3;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "m";
    points.storyPoints = 5;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "l";
    points.storyPoints = 8;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "xl";
    points.storyPoints = 13;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "xxl";
    points.storyPoints = 20;
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
    vs.persist().await().indefinitely();
  }

  private void squaresLoad() {
    VotingSystem vs = new VotingSystem();
    vs.displayText = "Powers of 2";
    vs.code = "square";
    vs.points = new ArrayList<>();
    VotingPoints points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "0";
    points.storyPoints = 0;
    vs.points.add(points);
    points = new VotingPoints();
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
    points.displayText = "4";
    points.storyPoints = 4;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.GREEN;
    points.displayText = "8";
    points.storyPoints = 8;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "16";
    points.storyPoints = 16;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "32";
    points.storyPoints = 32;
    vs.points.add(points);
    points = new VotingPoints();
    points.category = PointsCategory.RED;
    points.displayText = "64";
    points.storyPoints = 64;
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
    vs.persist().await().indefinitely();
  }
}

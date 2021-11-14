package in.cisne.poker;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;

@QuarkusTest
public class GraphQLTest {
  @Test
  public void CreateMutationTest() {
    RestAssured.given().when().contentType("application/json").body("""
        {
           \"variables\": {},
           \"query\": \"mutation {\n  newGame {\n    idString\n __typename\n   }\n}\n\"
         }
         """).post("/graphql").then().statusCode(200).body("data.game.idString", Matchers.not(Matchers.empty()));
  }
}

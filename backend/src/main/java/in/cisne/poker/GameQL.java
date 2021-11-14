package in.cisne.poker;

import java.util.List;

import org.bson.types.ObjectId;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Name;
import org.eclipse.microprofile.graphql.Query;

import in.cisne.poker.data.Game;
import in.cisne.poker.data.VotingSystem;
import io.smallrye.mutiny.Uni;

@GraphQLApi
public class GameQL {

  @Mutation
  public Uni<Game> newGame(String name, String code) {
    return Game.newGame(name, code);
  }

  @Query
  public Uni<Game> getGame(@Name("id") String gameId) {
    return Game.findById(new ObjectId(gameId));
  }

  @Query
  public Uni<List<VotingSystem>> getVotingSystems() {
    return VotingSystem.listAll();
  }

  @Query
  public Uni<VotingSystem> getVotingSystem(@Name("id") String gameId) {
    Uni<Game> uGame = getGame(gameId);
    Uni<String> uId = uGame.onItem().transform(g -> g.votingSystemId);
    return uId.onItem().transformToUni(id -> VotingSystem.findById(id));

  }
}

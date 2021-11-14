package in.cisne.poker;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.vertx.web.Route;
import io.vertx.ext.web.RoutingContext;

@ApplicationScoped
public class StaticResource {

  @Route(path = "/game")
  void gameStaticRoute(RoutingContext rc) {
    rc.reroute("/index.html");
  }

}

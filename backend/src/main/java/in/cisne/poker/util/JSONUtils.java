package in.cisne.poker.util;

import javax.enterprise.context.ApplicationScoped;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.cisne.poker.data.Game;
import in.cisne.poker.data.MessageDTO;

@ApplicationScoped
public class JSONUtils {

  private ObjectMapper mapper = new ObjectMapper();

  public String gameAsJSONString(Game game) throws JsonProcessingException {
    return mapper.writeValueAsString(game);
  }

  public MessageDTO stringAsMessageDTO(String dto) throws JsonProcessingException {
    return mapper.readValue(dto, MessageDTO.class);
  }

  public String messageDTOAsJSONString(MessageDTO dto) throws JsonProcessingException {
    return mapper.writeValueAsString(dto);
  }

  public Game stringAsGame(String game) throws JsonProcessingException {
    return mapper.readValue(game, Game.class);
  }
}

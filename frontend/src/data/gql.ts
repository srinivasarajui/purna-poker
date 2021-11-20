import { ApolloClient, HttpLink, InMemoryCache, gql, useMutation, useQuery } from '@apollo/client';

import { getGqlURL } from './urlUtil';

const httpLink = new HttpLink({
  uri: getGqlURL(),
});

export const clientGQL = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

interface GameResult {
  idString: String;
  adminCode: String;
}

interface NewGameMutation {
  name: String;
  code: String;
  participantName: String;
}

export const NEW_GAME = gql`
  mutation ($name: String, $code: String, $participantName: String) {
    newGame(name: $name, code: $code, participantName: $participantName) {
      idString
      name
      adminCode
    }
  }
`;
export const useNewGameMutation = () => useMutation<{ newGame: GameResult }, NewGameMutation>(NEW_GAME);

const QUERY_GAME = gql`
  query ($id: String) {
    game(id: $id) {
      idString
    }
  }
`;

export async function isValidateGameID(id: String): Promise<boolean> {
  const result = await clientGQL.query({
    query: QUERY_GAME,
    variables: {
      id: id,
    },
  });
  return !!result.data.game;
}

export const QUERY_VOTING_SYSTEMS = gql`
  query {
    votingSystems {
      displayText
      code
    }
  }
`;

interface VotingSystemsResult {
  displayText: String;
  code: String;
}
interface VotingSystemsResultWithData {
  votingSystems: VotingSystemsResult[];
}
export const useGetVotingSystems = () => {
  const { loading, data } = useQuery<VotingSystemsResultWithData>(QUERY_VOTING_SYSTEMS);
  return { loading, vs: data };
};
const QUERY_VOTING_SYSTEM = gql`
  query ($id: String) {
    votingSystem(id: $id) {
      code
      displayText
      points {
        storyPoints
        displayText
        category
      }
    }
  }
`;

export interface Points {
  storyPoints: number;
  displayText: String;
  category: String;
}
interface VotingSystemResult {
  displayText: String;
  code: String;
  points: Points[];
}
interface VotingSystemResultWithData {
  votingSystem: VotingSystemResult;
}
interface VotingSystemInput {
  id: String;
}
export const useGetVotingSystem = (id: String) => {
  const { loading, data } = useQuery<VotingSystemResultWithData, VotingSystemInput>(QUERY_VOTING_SYSTEM, {
    variables: { id: id },
  });
  const getDisplay = (id: number) =>
    data?.votingSystem.points.find((v) => v.storyPoints === id)?.displayText.toUpperCase();
  return { loading, data, getDisplay };
};

export const ADD_PARTICIPANT = gql`
  mutation ($id: String, $name: String, $code: String) {
    addParticipant(id: $id, name: $name, adminCode: $code) {
      idString
    }
  }
`;

export async function addParticipantMutation(id: String, name: String, code: String): Promise<boolean> {
  const result = await clientGQL.mutate({
    mutation: ADD_PARTICIPANT,
    variables: {
      id: id,
      name: name,
      code: code,
    },
  });
  return !!result.data.addParticipant;
}

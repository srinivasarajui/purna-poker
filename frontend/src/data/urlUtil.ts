let wsURL: string;
let gqlURL: string;

function populateURLs() {
  let new_uri;
  if (window.location.protocol === 'https:') {
    new_uri = 'wss:';
  } else {
    new_uri = 'ws:';
  }
  if (window.location.hostname === 'localhost') {
    wsURL = `${new_uri}//${window.location.hostname}:8080/`;
    gqlURL = `${window.location.protocol}//${window.location.hostname}:8080/graphql`;
  } else {
    wsURL = `${new_uri}//${window.location.host}/`;
    gqlURL = `${window.location.protocol}//${window.location.host}/graphql`;
  }
}

export const getWsURL = () => {
  if (!wsURL) {
    populateURLs();
  }
  return wsURL;
};

export const getGqlURL = () => {
  if (!gqlURL) {
    populateURLs();
  }
  return gqlURL;
};

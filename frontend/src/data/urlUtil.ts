let wsURL: string;
let gqlURL: string;
let loadBaseURL: string;

function populateURLs() {
  let wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  if (window.location.hostname === 'localhost') {
    wsURL = `${wsProtocol}//${window.location.hostname}:8080/socket`;
    gqlURL = `${window.location.protocol}//${window.location.hostname}:8080/graphql`;
  } else {
    wsURL = `${wsProtocol}//${window.location.host}/socket`;
    gqlURL = `${window.location.protocol}//${window.location.host}/graphql`;
  }
  loadBaseURL = `${window.location.protocol}//${window.location.host}/load`;
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

export const getLoadURL = (gameID: String, adminCode?: String) => {
  if (!loadBaseURL) {
    populateURLs();
  }
  if (adminCode) {
    return `${loadBaseURL}/${gameID}/${adminCode}`;
  }
  return `${loadBaseURL}/${gameID}`;
};

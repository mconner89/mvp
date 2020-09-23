const axios = require('axios');
const { API_KEY } = process.env;

const getPuuid = (username) => {
  const options = {
    url: `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/NA1`,
    headers: {
      'X-Riot-Token': `${API_KEY}`
    }
  };
  return axios(options);
};

const getMatches = (puuid) => {
  const options = {
    url: `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=20`,
    headers: {
      'X-Riot-Token': `${API_KEY}`
    }
  };
  return axios(options);
};

const getMatchData = (matchId) => {
  const options = {
    url: `https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`,
    headers: {
      'X-Riot-Token': `${API_KEY}`
    }
  };
  return axios(options);
}

module.exports.getPuuid = getPuuid;
module.exports.getMatches = getMatches;
module.exports.getMatchData = getMatchData;
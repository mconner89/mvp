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

module.exports.getPuuid = getPuuid;
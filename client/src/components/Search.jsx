import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
  const [username, setUserName] = useState('');
  return (
    <div>
      <h4>View your stats</h4>
      Enter your Riot username:{' '}
      <input
        value={username}
        onKeyPress={(e) => { e.key === 'Enter' && onSearch(username); }}
        onChange={(e) => { setUserName(e.target.value); }}
      />
      <button
        type="button"
        onClick={() => { onSearch(username); }}
      > Get Stats!
      </button>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;

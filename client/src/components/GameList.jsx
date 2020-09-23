import React from 'react';
import PropTypes from 'prop-types';
import Game from './Game.jsx';

const GameList = ({ games }) => (
  <div>
    Last {games.length} Games
    {games.map(game => (
      <Game key={game._id} game={game} />
    ))}
  </div>
);

GameList.propTypes = {

  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,

};

export default GameList;
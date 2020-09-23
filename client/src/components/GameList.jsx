import React from 'react';
import PropTypes from 'prop-types';
import Game from './Game.jsx';

const GameList = ({ games, finishes, deleteGame, editGame }) => {
  const avg = (finishes.reduce((a, b) => a + b, 0) / finishes.length) || 'N/A';

  return (
    <div>
      Last {games.length} Games <br />
      Average Placement: {avg}
      {games.map(game => (
        <Game
          key={game._id}
          game={game}
          deleteGame={deleteGame}
          editGame={editGame}
        />
      ))}
    </div>
  )
};

GameList.propTypes = {

  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,

};

export default GameList;
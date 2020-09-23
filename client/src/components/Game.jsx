import React from 'react';

const game = ({ game: { gold_left, last_round, level, placement, total_damage_to_players, game }, deleteGame }) => (
  <div style={{ border: '.5px solid lightblue', padding: '.5em', margin: '.5em 0' }}>
    <p>
      Place: {placement}<br />
      Level: {level}<br />
      Gold at end of game: {gold_left} <br />
      Last round played: {last_round} <br />
      Total damage to other players: {total_damage_to_players} <br />
      <button
        type='button'
        onClick={() => { deleteGame(game) }}
      >
        Delete this Game?
      </button>
    </p>
  </div>
);

export default game;
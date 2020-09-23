import React from 'react';

const game = ({ game: { gold_left, last_round, level, placement, total_damage_to_players } }) => (
  <div style={{ borderStyle: 'solid' }}>
    <p>
      Place: {placement}<br />
      Level: {level}<br />
      Gold at end of game: {gold_left} <br />
      Last round played: {last_round} <br />
      Total damage to other players: {total_damage_to_players}
    </p>
  </div>
);

export default game;
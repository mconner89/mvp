import React, { useState } from 'react';
import Editor from './Editor.jsx';

const game = ({ game: { gold_left, last_round, level, placement, total_damage_to_players, playerGame }, deleteGame, editGame }) => {
  const [viewEditor, setEditor] = useState(false);
  const newFunc = () => {
    setEditor(!viewEditor);
  }
  return (
  <div style={{ border: '.5px solid lightblue', padding: '.5em', margin: '.5em 0' }}>
      <div>
        Place: {placement}
      </div>
      <div>
        Level: {level}
      </div>
      <div>
        Gold at end of game: {gold_left}
      </div>
      <div>
        Last round played: {last_round}
      </div>
      <div>
        Total damage to other players: {total_damage_to_players}
      </div>
      <button
        type='button'
        onClick={() => { deleteGame(game) }}>
        Delete this Game?
      </button>
      <button
        type='button'
        onClick={() => {newFunc()}}>
        Edit this Game?
      </button>
      {viewEditor ? <Editor editGame={editGame} playerGame={playerGame} viewEditor={viewEditor} setEditor={setEditor}/> : null}
  </div>
  )
};

export default game;
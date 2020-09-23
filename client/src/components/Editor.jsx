import React, { useState } from 'react';

const editor = ({ editGame, playerGame, viewEditor, setEditor }) => {
  const [place, setPlace] = useState(1);
  const [level, setLevel] = useState(9);
  const [gold, setGold] = useState(50);
  const [lastRound, setLastRound] = useState(60);
  const [totalDamage, setTotalDamage] = useState(300);

  return (
  <div>
    Game Editor
    <div>
      <input
        value={place}
        onChange={e => {setPlace(e.target.value)}}
        placeholder='Place'/>
    </div>
    <div>
      <input
        value={level}
        onChange={e => {setLevel(e.target.value)}}
        placeholder='Level'/>
    </div>
    <div>
      <input
        value={gold}
        onChange={e => {setGold(e.target.value)}}
        placeholder='Gold'/>
    </div>
    <div>
      <input
        value={lastRound}
        onChange={e => {setLastRound(e.target.value)}}
        placeholder='Last Round'/>
    </div>
    <div>
      <input
        value={totalDamage}
        onChange={e => {setTotalDamage(e.target.value)}}
        placeholder='Total Damage'/>
    </div>
    <button
      type='button'
      onClick={() => {
        const values = {
          playerGame,
          placement: place,
          level,
          gold_left: gold,
          last_round: lastRound,
          total_damage_to_players: totalDamage
        };
        editGame(values);
        setEditor(!viewEditor);
        }}>
      Save Changes
    </button>
  </div>
  )
}

export default editor;
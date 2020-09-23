import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './Search.jsx';
import GameList from './GameList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      finishes: [],
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  handleSearch(username) {
    console.log(`${username} was searched`);
    axios.post('/', {username})
      .then(data => {
        this.setState({ games: data.data });
        const temp = [];
        data.data.forEach(game => {
          temp.push(game.placement);
        });
        this.setState({ finishes: temp });
      })
  }

  deleteGame(game) {
    axios.delete(`/delete/${game}`)
      .then(data => {
        this.setState({ games: data.data });
        const temp = [];
        data.data.forEach(game => {
          temp.push(game.placement);
        });
        this.setState({ finishes: temp });      })
  }

  render() {
    const { games, finishes } = this.state;

    return (
      <div>
        <h1>TFT Stats</h1>
        <Search
          onSearch={this.handleSearch}
        />
        <GameList
          games={games}
          finishes={finishes}
          deleteGame={this.deleteGame}
        />
      </div>
    )
  }
}

export default App;


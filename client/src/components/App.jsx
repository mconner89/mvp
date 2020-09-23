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
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(username) {
    console.log(`${username} was searched`);
    axios.post('/', {username})
      .then(data => {
        console.log(data.data);
        this.setState({ games: data.data });

      })
  }

  render() {
    const { games } = this.state;

    return (
      <div>
        <h1>Twitch Helper</h1>
        <Search onSearch={this.handleSearch}/>
        <GameList games={games} />
      </div>
    )
  }
}

export default App;


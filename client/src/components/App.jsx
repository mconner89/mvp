import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './Search.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(username) {
    console.log(`${username} was searched`);
    axios.post('/', {username});

  }

  render() {

    return (
      <div>
        <h1>Twitch Helper</h1>
        <Search onSearch={this.handleSearch}/>
      </div>
    )
  }
}

export default App;
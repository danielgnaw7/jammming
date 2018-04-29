import React, { Component } from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Spotify from './../../util/Spotify'
import './App.css';

const trackTest = {id: 1, name: 'ggmuomuojiohao', artist: 'hebe tien', album: 'SHE'};
const trackTest2 = {id: 2, name: 'me sad', artist: '5566', album: 'cannot die!'};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: "Daniel's List",
                  playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    console.log(this.state.searchResults);
    console.log(this.state.playlistTracks);
  }

  search(term) {
    const newResults = [trackTest, trackTest2];
    this.setState({searchResults: newResults});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
    console.log(this.state.playlistName);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newPlayList = [];
    this.state.playlistTracks.map(oldTrack => {
      newPlayList.push(oldTrack);
    });
    newPlayList.push(track);
    this.setState({
      playlistTracks: this.state.playlistTracks.concat(track)
    });
  }

  removeTrack(track) {
    const newPlayList = [];
    this.state.playlistTracks.map(oldTrack => {
      if(track.id !== oldTrack.id)
      newPlayList.push(oldTrack);
    });
    this.setState({
      playlistTracks: newPlayList
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*!-- Add a SearchBar component -->*/}
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/> 
            {/* Add a Playlist component */}
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

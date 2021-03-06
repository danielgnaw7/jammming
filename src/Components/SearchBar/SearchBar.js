import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {searchWord: ''};
  	this.search = this.search.bind(this);
  	this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
  	this.setState({searchWord: event.target.value});
  }

  search(event){
  	this.props.onSearch(this.state.searchWord);
  	event.preventDefault();
  }

  render() {
    return (
		<div className="SearchBar">
		  <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
		  <a onClick={this.search}>SEARCH</a>
		</div>
    );
  }
}

export default SearchBar;

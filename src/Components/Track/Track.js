import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
  	super(props);
  	this.addTrack = this.addTrack.bind(this);
  	this.removeTrack = this.removeTrack.bind(this);
  }	
  renderAction(isRemoval) {
  	if(isRemoval)
  		return '-';
  	else
  		return '+';
  }

  addTrack() {
  	const track = {id: this.props.id, name: this.props.name, uri: this.props.uri, artist: this.props.artist, album: this.props.album};
  	console.log(track);
  	this.props.onAdd(track);
  }

  removeTrack() {
  	const track = {id: this.props.id,  name: this.props.name, uri: this.props.uri, artist: this.props.artist, album: this.props.album};
  	console.log(track);
  	this.props.onRemove(track);
  }
  render() {
  	if(this.props.isRemoval) {
	    return (
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.name}</h3>
			    <p>{this.props.artist}  {this.props.album} </p>
			  </div>
			  <a className="Track-action" onClick={this.removeTrack}> {this.renderAction(this.props.isRemoval)}</a>
			</div>
	    );
	} else {
	    return (
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.name}</h3>
			    <p>{this.props.artist}  {this.props.album} </p>
			  </div>
			  <a className="Track-action" onClick={this.addTrack}> {this.renderAction(this.props.isRemoval)}</a>
			</div>
	    );
	}
  }
}

export default Track;

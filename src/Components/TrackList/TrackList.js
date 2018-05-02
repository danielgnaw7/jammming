import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';
class TrackList extends React.Component {
  render() {
    return (
		<div className="TrackList">
			{
				this.props.tracks.map(track => {
					return <Track id={track.id} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} uri={track.uri} name={track.name} artist={track.artist} album={track.album} />
				})
			}
		    {/*} You will add a map method that renders a set of Track components  -->*/}
		</div>
    );
  }
}

export default TrackList;

const clientId = '340356171df7481ab6da27f8ea5b1ae8';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
	getAccessToken(){
		if(accessToken){
			return accessToken;
		}

		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

		//console.log("url access token " + urlAccessToken + " " + "url expires in " + urlExpiresIn + '\n')
		if(urlAccessToken && urlExpiresIn) {
			accessToken = urlAccessToken[1];
			const expiresIn = Number(urlExpiresIn[1]);
			console.log("expires in " + expiresIn);
			window.setTimeout(() => accessToken = '', expiresIn *1000000000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},

	search(term) {
		const accessToken = Spotify.getAccessToken();
		console.log("access token is " + accessToken);
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{
				headers: {Authorization: `Bearer ${accessToken}`}
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				if(!jsonResponse.tracks) {
					return [];
				}
				console.log(jsonResponse.tracks);
				return jsonResponse.tracks.items.map(track => ({
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
				}));
			})
	},

	savePlaylist(playlistName, trackUris) {
		if(!(playlistName && trackUris.length)){
			return false;
		}

		
		console.log("playlistname " + playlistName);
		console.log("trackUris" + trackUris);
		const accessToken = Spotify.getAccessToken();
		const headers = {Authorization: `Bearer ${accessToken}`};
		let userId;

		return fetch('https://api.spotify.com/v1/me', {headers : headers}
			).then(response => response.json()
			).then(jsonResponse => {
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({name: playlistName})
					}).then(response => response.json()
					).then(jsonResponse => {
						const playlistId = jsonResponse.id;
						return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
							headers: headers,
							method: 'POST',
							body: JSON.stringify({uris: trackUris})
						})
					})
			})

	}
};


export default Spotify;
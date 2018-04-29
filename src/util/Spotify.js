const clientID = '340356171df7481ab6da27f8ea5b1ae8';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
	accessToken: '',
	expiresIn: '',
	getAccessToken(){
		if(this.token === '') {
			const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
			const urlExpiresIn = window.location.href.match(/expires_in([^&]*)/);
			if(urlAccessToken !== '') {
				//we found access token information in URL, grab and save it
				this.accessToken = urlAccessToken;
				this.expiresIn = urlExpiresIn;
				window.setTimeout(() => this.accessToken = '', this.expiresIn * 1000);
				window.hisotry.pushState('Access Token', null, '/');

			} else {
				//redirect users to this location if we don't find any access token
				window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);

			}
		} else {
			//return accessToken if there already
			return this.accessToken;
		}
	},

	search(term) {
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{
				headers: {Authorization: `Bearer ${this.accessToken}`}
			}).then(response => {
				return response().json();
			}).then(jsonResponse => {
				console.log(jsonResponse);
				return jsonResponse.map(track => {
					let trackObject = {
						ID: track.id,
						Name: track.name,
						Artist: track.artist[0].name,
						Album: track.album.name,
						URI: track.uri
					}
				});
			})
	}
};


export default Spotify;
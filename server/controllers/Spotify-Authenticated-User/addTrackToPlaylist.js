import { userSpotifyApiAuth } from '../userSpotifyAuth';

export const addTrackToPlaylist = async(req, res) => {
    const trackId = req.body.trackId;
    const playlist = req.body.playlist;
    await userSpotifyApiAuth
        .addTracksToPlaylist(playlist, ["spotify:track:"+trackId])
        .then((data) => {
            res.status(200).send({
                message: "Added track to playlist"
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
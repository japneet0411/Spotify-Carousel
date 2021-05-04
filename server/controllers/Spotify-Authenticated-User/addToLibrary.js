import { userSpotifyApiAuth } from './../userSpotifyAuth';

export const addToLibrary = async(req, res) => {
    const trackId = req.body.trackId;
    userSpotifyApiAuth
        .addToMySavedTracks([trackId])
        .then((data) => {
            res.status(200).send({
                message: "Added track to library"
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
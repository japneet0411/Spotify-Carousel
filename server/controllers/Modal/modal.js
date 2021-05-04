import { playlistsModel } from './../../models/playlists';
//import { usersModel } from './../../models/users';
import randomItem from 'random-item';

export const modal = async(req, res) => {
    const playlist = await playlistsModel.find({ playlistName: req.params.playlist }).exec();
    const listOfTracks = playlist[0].listOfTracks;
    //const query = await usersModel.findOne({ username: req.params.username });
    //const explicit = query.explicit;
    console.log("The count is: ",listOfTracks);
    var track = randomItem(listOfTracks);
    var count=0;
    /*if(explicit){
        while(track.explicit && count!=20){
            track = randomItem(listOfTracks);
            count++;
        }
        if(track.explicit){
            res.status(401).send({
                message: "Could not find track that satisfies your parameters."});
        }
    }*/
    res.status(200).send({
        embed_url: "https://open.spotify.com/embed/track/"+track
    });
}
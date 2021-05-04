import { playlistsModel } from './../../models/playlists';
import randomItem from 'random-item';

export const carousel = async(req, res) => {
    const playlists = await playlistsModel.find({}).exec();
    var listOfPlaylists = [];
    for(var i=0; i<10; i++){
        var item = randomItem(playlists);
        if(item in listOfPlaylists)
            i--;
        else{
            listOfPlaylists.push(item);
        }
    }
    var carouselDetails = [];
    for(var i=0; i<listOfPlaylists.length; i++){
        carouselDetails.push({
            name: listOfPlaylists[i].playlistName,
            description: listOfPlaylists[i].playlistDescription,
            carouselImage: listOfPlaylists[i].carouselImage
        });
    }
    res.status(200).send(carouselDetails);
}
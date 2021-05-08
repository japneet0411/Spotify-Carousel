import { playlistsModel } from './../../models/playlists';
import { usersModel } from './../../models/users';
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
    const query = await usersModel.findOne({
        username: req.params.username
    });
    const savedPlaylists = query.savedPlaylists;
    var carouselDetails = [];
    for(var i=0; i<listOfPlaylists.length; i++){
        if(savedPlaylists.indexOf(listOfPlaylists[i].playlistName)===-1)
            carouselDetails.push({
                name: listOfPlaylists[i].playlistName,
                description: listOfPlaylists[i].playlistDescription,
                carouselImage: listOfPlaylists[i].carouselImage,
                saved: false,
                message: "Success"
            });
        else
            carouselDetails.push({
                name: listOfPlaylists[i].playlistName,
                description: listOfPlaylists[i].playlistDescription,
                carouselImage: listOfPlaylists[i].carouselImage,
                saved: true,
                message: "Success"});
    }
    res.status(200).send(carouselDetails);
}
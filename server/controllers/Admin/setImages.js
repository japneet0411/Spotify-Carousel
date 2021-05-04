import { playlistsModel } from './../../models/playlists';
import { unsplash } from './unsplashAuth';

export const setImages = async(req, res) => {
    const playlists = await playlistsModel.find({}).exec();
    for(var i=108; i<playlists.length; i++){
        console.log(i);
        await unsplash.photos
        .getRandom({
            query: "pastel",
            contentFilter: "high",
            orientation: "landscape",
            featured: true,
            count: 2
          })
        .then(async(result) => {
            if(result.errors){
                console.log(result.errors[0]);
            }
            else{
                var carouselImage = result.response[0].urls.raw;
                var coverImage = result.response[1].urls.raw;
                await playlistsModel.findOneAndUpdate({
                    playlistName: playlists[i].playlistName
                }, {
                    carouselImage: carouselImage,
                    coverImage: coverImage
                }).exec();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    res.status(200).send("Set images for playlists");
}
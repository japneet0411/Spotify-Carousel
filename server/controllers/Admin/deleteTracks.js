import { tracksModel } from './../../models/tracks';

export const deleteTracks = async(req, res) => {
    const tracks = await tracksModel.find({}).exec();
    var toDelete = [];
    for(var i=0; i<tracks.length; i++){
        if(tracks[i].savedBy===0 && tracks[i].recommendedTo===0)
            toDelete.push(tracks[i].track_id);
    }
    for(var i=0; i<toDelete.length; i++){
        await tracksModel.findOneAndDelete({
            track_id: toDelete[i]
        });
    }
    res.status(200).send("Deleted unused track details");
}